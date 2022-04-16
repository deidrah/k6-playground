import { check } from 'k6';
import http from 'k6/http';
import {Rate} from 'k6/metrics';
import {Check} from 'k6/metrics';

const failureRate = new Rate('failed requests');
export let options = {
  vus: 10,
  duration: '10s',
  thresholds: {
    'failed requests': ['rate<0.1'], //error rate should not be more than 10%
    'http_rq_duration': ['p(95)<200','p(99)<400'], //http request duration for 95% of time should be less than 200ms +response time for 99% of requests should be below 400ms
    'checks': ['rate>0.9'] //90% of error rate should be successfull
  }
}
export default function() {
  let res = http.get('https://run.mocky.io/v3/3dc8c6e5-cb89-4ff5-a06a-672209d1e4b6');
  failureRate.add(res.status !== 200) // if response is not 200,then fail

  check(response, {
    'is status 200:' : r => r.status === 200
  })

}