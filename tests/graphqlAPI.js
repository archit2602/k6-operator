import http from 'k6/http';
import { check, sleep } from 'k6';

const BASE_URL = 'https://graphql.lottiefiles.com';

export const options = {
    stages: [
      { duration: '10s', target: 1 },
      { duration: '10s', target: 2 },
    ],
    thresholds: {
      http_req_failed: ['rate<0.01'], // http errors should be less than 1%
      http_req_duration: ['p(95)<500'], // 95 percent of response times must be below 500ms
    },
  };

  export default function () {
    const query = `
    {
    featuredToday{ 
      name
      id
     }
    }`;
     let res = http.post(
         BASE_URL,
         JSON.stringify({ query: query}),
         { headers:{"Content-Type": "application/json"}}
     );
    check(res, { 
        'status was 200': (r) => r.status == 200,
        'test validation': (r) => r.body.includes("name")
     });
    sleep(1);
  }
