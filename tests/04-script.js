import http from 'k6/http';
import { check } from 'k6';
import { Rate } from 'k6/metrics';

export let errorRate = new Rate('errors');

export let options = {
  thresholds: {
    errors: ['rate<0.1'] // 10% of errors are allowed
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
}