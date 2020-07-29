import http from 'k6/http';
import { sleep, check } from 'k6';


export default function() {
  var arr = [];
  for (var id = 10000000; id < 10001000; id++) {
    let req = {
      method: 'POST',
      url: `http://18.221.79.58:3001/api/products/?id=${id}`,
      body: {
        "id": id,
        "title": "Sleek Concrete Mouse",
        "description": "Repellendus pariatur soluta minima et eligendi quasi. Tempore enim recusandae. Perspiciatis temporibus quas ullam sit reiciendis.",
        "rating": 4.56,
        "variations": [{"color":"turquoise","cost":"808.00","images":[{"src":"http://picsum.photos/seed/739/846/1038"}]}]
      }
    };
    arr.push(req);
  }

  let responses = http.batch(arr);
}