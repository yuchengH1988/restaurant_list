const mongoose = require('mongoose')
const Schema = mongoose.Schema
const restaurantSchema = new Schema({
  id: Number,
  name: String,
  name_en: String,
  category: String,
  image: String,
  location: String,
  phone: String,
  google_map: String,
  rating: Number,
  description: String,
})
module.exports = mongoose.model('Restaurant', restaurantSchema)

//        "id": 2,
// "name": "梅子鰻蒲燒專賣店",
//   "name_en": "Umeko Japanese Unagi House",
//     "category": "日本料理",
//       "image": "https://assets-lighthouse.s3.amazonaws.com/uploads/image/file/5628/02.jpg",
//         "location": "台北市中山區林森北路 107 巷 8 號",
//           "phone": " 02 2521 2813",
//             "google_map": "https://goo.gl/maps/cUJEmFSRKyH2",
//               "rating": 4.3,
//                 "description": "鰻魚、鰻魚飯、真空鰻魚"