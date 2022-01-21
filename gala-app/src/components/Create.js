import React, { useState } from 'react';
import UserHeader from './UserHeader';
import Navigation from './Navigation';
import ReactAnime from 'react-animejs';
import '../css/Dashboard.css';
import '../css/Create.css';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDateTimePicker from '@mui/lab/DesktopDateTimePicker';
import TextField from '@mui/material/TextField';
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask'

const { Anime } = ReactAnime;

const defaultMaskOptions = {
  prefix: '$',
  suffix: '',
  includeThousandsSeparator: true,
  thousandsSeparatorSymbol: ',',
  allowDecimal: true,
  decimalSymbol: '.',
  decimalLimit: 2, // how many digits allowed after the decimal
  integerLimit: 7, // limit length of integer numbers
  allowNegative: false,
  allowLeadingZeroes: false,
}

function Create() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const currencyMask = createNumberMask({
    ...defaultMaskOptions,
  })

  // controller state
  const [control, setControl] = useState(null);

  // meta state
  const [meta, setMeta] = useState({
      control: control,
      progress: 100,
      currentTime: 0,
      duration: 0
  });

  // timeline
  var timeline = [];
  timeline.push(
    {
        targets: "#DashboardTitleDescriptionArea",
        delay: 0,
        duration: 800,
        opacity: 100,
        easing: "easeInOutExpo",
    })

  return (
    <React.Fragment>
      <UserHeader />
      <div className="DashboardArea">
        <Navigation selectedOption="create"/>
        <div className="CreateArea">
          <div className="DashboardTitleDescriptionAreaWrapper">
            <div className="DashboardTitleDescriptionArea"
                 id="DashboardTitleDescriptionArea">
              <div className="DashboardTitleText">
                Create
              </div>
              <div className="DashboardTitleDot"/>
              <div className="DashboardDescriptionText">
                Propose a date and meet new friends
              </div>
            </div>
          </div>
          <div className="CreateFormArea">
            <div className="CreateFormRow">
              <div className="CreateFormRowTitle">
                Title:
              </div>
              <input className="CreateFormRowInput" placeholder='Pitbull Concert'>
              </input>
            </div>
            <div className="CreateFormRow">
              <div className="CreateFormRowTitle">
                Description:
              </div>
              <input className="CreateFormRowInput"
                    placeholder='Come to the Pitbull concert with me this Saturday at the Moda Center!'>
              </input>
            </div>
            <div className="CreateFormRow">
              <div className="CreateFormRowTitle">
                Address:
              </div>
              <div className="CreateFormInputAreaAddress">
                <div className="CreateFormInputAreaRowAddress AddressFirst">
                  <input className="CreateFormRowInputAddress"
                      placeholder='Street Name'>
                  </input>
                </div>
                <div className="CreateFormInputAreaRowAddress">
                  <input className="CreateFormRowInputAddress"
                      placeholder='City'>
                  </input>
                  <input className="CreateFormRowInputAddress"
                      placeholder='State'>
                  </input>
                  <input className="CreateFormRowInputAddress"
                      placeholder='ZIP Code'>
                  </input>
                </div>
              </div>
            </div>
            <div className="CreateFormRow Time">
              <div className="CreateFormRowTitle Time">
                Time:
              </div>
              <div className="CreateFormInputAreaTime">
                <div className="CreateFormDateTime">
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDateTimePicker
                      value={startDate}
                      onChange={(newStartDate) => {
                        setStartDate(newStartDate);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                      minDate={new Date()}
                    />
                  </LocalizationProvider>
                </div>
                <div className="CreateFormTimeBetweenText">
                  <div>to</div>
                </div>
                <div className="CreateFormDateTime">
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDateTimePicker
                      value={endDate}
                      onChange={(newEndDate) => {
                        setEndDate(newEndDate);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                      minDate={startDate}
                    />
                  </LocalizationProvider>
                </div>
              </div>
            </div>
            <div className="CreateFormRow">
              <div className="CreateFormRowTitle">
                Auction Price:
              </div>
              <MaskedInput className="CreateFormRowInput Price"
                mask={currencyMask}
                placeholder="$50.00"
              />
            </div>
            <div className="CreateFormRow">
              <div className="CreateFormRowTitle">
                Proof of Experience:
              </div>
              <input type="file" className="CreateFormInputProof" required></input>
            </div>
          </div>
        </div>
      </div>
      <Anime initial={timeline}
              control={control}
              setMeta={setMeta}
              animeConfig={{
                  autoplay: true,
                  duration: 4000,
                  easing: "easeInOutSine"
              }}>
      </Anime>
    </React.Fragment>
    
  );
}

export default Create;
