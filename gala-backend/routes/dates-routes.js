import axios from 'axios';
import bidTemplate from '../models/BidModels.js';
import { ServerError, serverErrorTypes } from '../error/generic-errors.js';
import postTemplate from '../models/PostModels.js';
import userTemplate from '../models/UserModel.js';
import mongoose from 'mongoose';

//returns: upcoming dates, dates created, past dates
/* TO DO 
1. Return upcoming dates
2. Return dates created
3. Return past dates
*/

const getDates = async (req, res, next) => {
	const urlParams = new URLSearchParams(req._parsedUrl.query);
	const addressCoords = [urlParams.get('longitude'), urlParams.get('latitude')];
	// console.log(urlParams.toString())
	const username = mongoose.Types.ObjectId(req.user.id);
	try {
		const doc = await postTemplate.find({ creatorId: username });
		let my_dates = {};
		let created_list = [];
		const created = JSON.parse(JSON.stringify(doc));
		const userInfo = await userTemplate
			.findOne({ _id: username })
			.select('firstName profilePictureLink rating');

		for (let j = 0; j < created.length; j += 1) {
			created[j]['hostInfo'] = userInfo;
			// console.log(created[j])
			

			//Calculate Distance from the current location
			var R = 3960; // Radius of the earth in miles
			var dLat = (Math.PI / 180) * (addressCoords[1] - created[j].location.coordinates[1]); // deg2rad below
			var dLon = (Math.PI / 180) * (addressCoords[0] - created[j].location.coordinates[0]);
			var a =
				Math.sin(dLat / 2) * Math.sin(dLat / 2) +
				Math.cos((Math.PI / 180) * addressCoords[1]) *
					Math.cos((Math.PI / 180) * created[j].location.coordinates[1]) *
					Math.sin(dLon / 2) *
					Math.sin(dLon / 2);
			var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
			var d = R * c; // Distance in miles
			d = Math.round(d * 10) / 10; //Rounded for aesthetics

			created[j]['userDistance'] = d;
			created_list.push(created[j]);
		}
		my_dates['createdDates'] = created_list;
		//get all posts where your bid is confirmed on
		const upcoming_query = await bidTemplate
			.find({ bidderId: username, status: 'Confirmed' })
			.populate({
				path: 'postId',
			})
			.select('postId');

		let upcomingDates = [];
		let pastDates = [];
		const upcoming_json = JSON.parse(JSON.stringify(upcoming_query));
		for (let i = 0; i < upcoming_json.length; i += 1) {
			const hostInfo = await userTemplate
				.findOne({ _id: mongoose.Types.ObjectId(upcoming_json[i]['postId']['creatorId']) })
				.select('firstName profilePictureLink rating');
			upcoming_json[i]['hostInfo'] = JSON.parse(JSON.stringify(hostInfo));
			const end_time = upcoming_json[i]['postId']['timeEnd'];
			const start_time = upcoming_json[i]['postId']['timeStart'];
			const current_time = new Date().toISOString();
			// console.log(upcoming_json[i])
			//Calculate Distance from user currently
			var R = 3960; // Radius of the earth in miles
			var dLat = (Math.PI / 180) * (addressCoords[1] - upcoming_json[i].postId.location.coordinates[1]); // deg2rad below
			var dLon = (Math.PI / 180) * (addressCoords[0] - upcoming_json[i].postId.location.coordinates[0]);
			var a =
				Math.sin(dLat / 2) * Math.sin(dLat / 2) +
				Math.cos((Math.PI / 180) * addressCoords[1]) *
					Math.cos((Math.PI / 180) * upcoming_json[i].postId.location.coordinates[1]) *
					Math.sin(dLon / 2) *
					Math.sin(dLon / 2);
			var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
			var d = R * c; // Distance in miles
			d = Math.round(d * 10) / 10; //Rounded for aesthetics

			upcoming_json[i]['userDistance'] = d;





			if (current_time <= end_time) {
				if (current_time < start_time) {
					upcoming_json[i]['dateStatus'] = 'Upcoming';
				} else {
					upcoming_json[i]['dateStatus'] = 'Ongoing';
				}
				upcomingDates.push(upcoming_json[i]);
			} else {
				upcoming_json[i]['dateStatus'] = 'Completed';
				pastDates.push(upcoming_json[i]);
			}
		}
		my_dates['upcomingDates'] = upcomingDates;
		my_dates['pastDates'] = pastDates;

		return res.json(my_dates);
	} catch (err) {
		return next(new ServerError(serverErrorTypes.mongodb, err));
	}
};

export default {
	getDates: getDates,
};
