import http from 'k6/http';
import {check} from 'k6';
import {Trend} from 'k6/metrics';
import {Rate} from 'k6/metrics';

export let errorRate = new Rate('errors');

let getApiTrend = new Trend('TREND_GET_Api_Duration');
let getApiTrendWaiting = new Trend('TREND_GET_Api_Waiting');
let googleGetApiTrend = new Trend('TREND_GET_Google_Api_Duration');
let googleGetApiTrendWaiting = new Trend('TREND_GET_Google_Api_Waiting');


export let options = {
  thresholds: {
    errors: ['rate<0.1']
  }
}
export default function() {
  let response = http.get('https://run.mocky.io/v3/9a7f93f2-c6d7-472f-a852-0e43c9300bf2');
  console.log(`response body length ${response.body.length} for VU= ${__VU} iteration = ${__ITER}`)
  
  const check1 = check(response, {
    'is reponse status 200 :' : (r) => r.status === 200,
    'body size is 0 bytes :' : (r) => r.body.length == 38,
  })
  errorRate.add(check1);
  getApiTrend.add(response.timings.duration);//added response duration inside custom trend
  getApiTrendWaiting.add(response.timings.waiting);

  const googleResponse = http.get('https://www.google.com');
  googleGetApiTrend.add(googleResponse.timings.duration);
  googleGetApiTrendWaiting.add(googleResponse.timings.waiting);
}