import {Check, fail} from 'k6';
import {Rate} from 'k6/metrics';
import http from 'k6/http';
import {Trend} from 'k6/metrics';

let failureRate = new Rate('failure_rate');

let createCourseTrend = new Trend('Trend_CreateCourse')
let getCourseTrend = new Trend('Trend_GetCourse')
let deleteCourseTrend = new Trend('Trend_DeleteCourse')

export const setHeader = () => {
  return {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  }
}

export const route_createCourse = (endpoint,token) => `${endpoint}?wstoken=${token}&query`;
export const route_getCourse = (endpoint, token, courseID) => `${endpoint}?wstoken=${token}${courseID}`;

export function createCourse(endpoint, token){
  console.log(`inside create course token=${token}`)
  let postResponse = http.post(`${route_createCourse(endpoint,token)}`, null, setHeader());
  createCourseTrend.add(postResponse.timings.duration);
  checkPostResponse = check(postResponse, {
    "Create Course status 200" : r => r.status === 200
  })
  failureRate.add(!checkPostResponse); //if check does not make 200, add a failure
  let responseBody = JSON.parse(postResponse.body);
  try {
    let id = responseBody[0].id;
    console.log(`course id is ${id}`);
  } catch(ex) {
    checkPostResponse = check(postResponse, {
      "Create course does not return valid data " : r => r.status !== 200 
    })
    failureRate.add(!checkPostResponse);
  }
  return responseBody;
}

export function getCourse(endpoint,token,courseID) {
  const getResponse = http.get(`${route_getCourse(endpoint,token,courseID)}`, null); // "body is null" then why even passing it here? :/
  checkGetResponse = check(getResponse, {
    "Get course status " : r => r.status === 200,
  })
  failureRate.add(!checkGetResponse);
  getCourseTrend.add(getResponse.timings.duration);
  let getResponseBody = JSON.parse(getResponse.body);

  try {
    if(`${getResponseBody[0].id} == 'undefined'`) {
      checkGetResponse = check(getResponse, {
        "Get course returns undefined id " : r => r.status === 999 // any invalid value? hmm
      })
      failureRate.add(!checkGetResponse);
    }
    console.log(`course id is ${getResponseBody[0].id}`)
  }
  catch(ex){
    checkGetResponse = check(getResponse, {
      "Get course does not return valid data ": r => r.status !== 200
    })
    failureRate.add(!checkGetResponse)
  }
}