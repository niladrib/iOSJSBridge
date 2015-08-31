

var tip_metadata = {
  "thresholds": {
    "bounce": {
      "min": 100,
      "max": 500,
      "priority": 1
    },
    "pelvic_rot": {
      "max": 30,
      "priority": 1
    }
  },
  "tips": [
    {
      "id": 1,
      "text" : "Keep your midsection engaged, like someone is going to punch you",
      "triggers": [
        {
          "parameter": "pelvic_rot",
          "threshold": "max",
          "priority": 1
        }
      ]
    },
    {
      "id": 2,
      "text" : "Evenness - you're running one leg at a time",
      "triggers": [
        {
          "parameter": "pelvic_rot",
          "threshold": "max",
          "priority": 2
        },
        {
          "parameter": "bounce",
          "threshold": "max",
          "priority": 1
        }
      ]
    }
  ]
};

var test_data = [
  {
    "t": 1,
    "cadence": 111.11,
    "bounce": 222.22,
    "lurch": 333.33,
    "pelvic_rot": 0,
    "stride": 555.55,
    "ground_contact_t": 666.66
  },
  {
    "t": 2,
    "cadence": 111.11,
    "bounce": 222.22,
    "lurch": 333.33,
    "pelvic_rot": 10,
    "stride": 555.55,
    "ground_contact_t": 666.66
  },
  {
    "t": 3,
    "cadence": 111.11,
    "bounce": 222.22,
    "lurch": 333.33,
    "pelvic_rot": 20,
    "stride": 555.55,
    "ground_contact_t": 666.66
  },
  {
    "t": 4,
    "cadence": 111.11,
    "bounce": 222.22,
    "lurch": 333.33,
    "pelvic_rot": 30,
    "stride": 555.55,
    "ground_contact_t": 666.66
  },
  {
    "t": 5,
    "cadence": 111.11,
    "bounce": 222.22,
    "lurch": 333.33,
    "pelvic_rot": 40,
    "stride": 555.55,
    "ground_contact_t": 666.66
  },
  {
    "t": 6,
    "cadence": 111.11,
    "bounce": 222.22,
    "lurch": 333.33,
    "pelvic_rot": 50,
    "stride": 555.55,
    "ground_contact_t": 666.66
  },
  {
    "t": 7,
    "cadence": 111.11,
    "bounce": 222.22,
    "lurch": 333.33,
    "pelvic_rot": 60,
    "stride": 555.55,
    "ground_contact_t": 666.66
  },
  {
    "t": 8,
    "cadence": 111.11,
    "bounce": 222.22,
    "lurch": 333.33,
    "pelvic_rot": 70,
    "stride": 555.55,
    "ground_contact_t": 666.66
  },
  {
    "t": 9,
    "cadence": 111.11,
    "bounce": 222.22,
    "lurch": 333.33,
    "pelvic_rot": 80,
    "stride": 555.55,
    "ground_contact_t": 666.66
  },
  {
    "t": 10,
    "cadence": 111.11,
    "bounce": 222.22,
    "lurch": 333.33,
    "pelvic_rot": 90,
    "stride": 555.55,
    "ground_contact_t": 666.66
  }
];

//CODE

function calcAvg(dataPoints){
  return dataPoints.reduce(function(avg, currVal, idx, array){
    var newAvg = {};
    newAvg.cadence = (avg.cadence*idx + currVal.cadence)/(idx+1);
    newAvg.bounce = (avg.bounce*idx + currVal.bounce)/(idx+1);
    newAvg.lurch = (avg.lurch*idx + currVal.lurch)/(idx+1);
    newAvg.pelvic_rot = (avg.pelvic_rot*idx + currVal.pelvic_rot)/(idx+1);
    newAvg.stride = (avg.stride*idx + currVal.stride)/(idx+1);
    newAvg.ground_contact_t = (avg.ground_contact_t*idx 
                               + currVal.ground_contact_t)/(idx+1);
    console.log("avg bouce=" + avg.bounce + " avg pelvic_rot=" + avg.pelvic_rot +
               " idx=" + idx);
    console.log("newAvg bouce=" + newAvg.bounce + " newAvg pelvic_rot=" + 
                newAvg.pelvic_rot);
    return newAvg;
  });
} 

//TEST CODE
var avg = calcAvg(test_data);
console.log("avg bouce=" + avg.bounce + " avg pelvic_rot=" + avg.pelvic_rot);
