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
	//Verify request comes from logged in user?
	const username = mongoose.Types.ObjectId(req.user.id);
	// console.log('this is the username', username);
	try {
		const doc = await postTemplate.find({ creatorId: username });
		let my_dates = {};
		let created_list = [];
		const created = JSON.parse(JSON.stringify(doc));
		const userInfo = await userTemplate
			.findOne({ _id: username })
			.select('firstName profilePictureLink rating');
		// console.log('this is userinfo', userInfo);
		for (let j = 0; j < created.length; j += 1) {
			created[j]['hostInfo'] = userInfo;
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

		// console.log('this is the created dates', my_dates);
		return res.json(my_dates);
	} catch (err) {
		return next(new ServerError(serverErrorTypes.mongodb, err));
	}
};

export default {
	getDates: getDates,
};
