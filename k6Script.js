import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  stages: [
    { duration: '1s', target: 50 },
    { duration: '30s', target: 50 }
  ]
};

export default function() {
  for (let i = 0; i < 75; i++) http.get('http://localhost:3002');
  sleep(1);
}
