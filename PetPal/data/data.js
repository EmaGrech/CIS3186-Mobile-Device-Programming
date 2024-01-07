// image carousel data
const images = [
  "https://media.istockphoto.com/id/1247884083/vector/laundry-service-room-vector-illustration-washing-and-drying-machines-with-cleansers-on-shelf.jpg?s=612x612&w=0&k=20&c=myaNEKlqX7R--bzWGDoMI7PhdxG_zdQTKYEBlymJQGk=",
  "https://images.pexels.com/photos/5591581/pexels-photo-5591581.jpeg?auto=compress&cs=tinysrgb&w=800",
];

// view prop types error -> code to paste
// get ColorPropType(): $FlowFixMe {
//     return require('deprecated-react-native-prop-types').ColorPropType;
//   },

//   get EdgeInsetsPropType(): $FlowFixMe {
//     return require('deprecated-react-native-prop-types').EdgeInsetsPropType;
//   },

//   get PointPropType(): $FlowFixMe {
//     return require('deprecated-react-native-prop-types').PointPropType;
//   },

//   get ViewPropTypes(): $FlowFixMe {
//     return require('deprecated-react-native-prop-types').ViewPropTypes;
//   },

// services data code
// const services = [
//   {
//     id: "0",
//     image: "https://cdn-icons-png.flaticon.com/128/3003/3003984.png",
//     name: "Washing",
//   },
//   {
//     id: "11",
//     image: "https://cdn-icons-png.flaticon.com/128/2975/2975175.png",
//     name: "Laundry",
//   },
//   {
//     id: "12",
//     image: "https://cdn-icons-png.flaticon.com/128/9753/9753675.png",
//     name: "Wash & Iron",
//   },
//   {
//     id: "13",
//     image: "https://cdn-icons-png.flaticon.com/128/995/995016.png",
//     name: "Cleaning",
//   },
// ];

// products data 
const services = [
  // for now I am going to use my old image instead of the drive
  // I have to update the drive
  // https:/drive.google.com/file/d/1TrdyJ07jDGXfEvg22sz_VVALRu2i1wJA/view?usp=drive_link
  // https://cdn-icons-png.flaticon.com/128/4643/4643574.png
    {
      id: "0", //check if id is supposed to be a string or num because in the new database it is a number. In mobile prog database, they r strings
      Seller_ID: "9bWfTkhlHBt3WhGo95pe", //they all used to be 1
      Category: "Pet Essentials",
      Description: "Features: gently removes Loose Hair, and eliminates Tangles, Knots, Dander and trapped Dirt. Doing massage for your pet is good for preventing skin disease,Massaging particles won't scratch your pet,and increasing blood circulation. This slicker brush is suitable for many pets(dogs, cats, fragrance pigs, rabbit , orangutans etc), especially with Long, Medium, Short, Thick, Wiry, or Curly Hair.",
      Image: "https://cdn-icons-png.flaticon.com/128/4643/4643574.png",
      Price: 7.5,
      Quantity: 0,
      Product_Name: "Hair Remover Brush ",
      Stock: 23
    },
    {
      id: "1",
      Seller_ID: "MBdTsPj8xzUzUb8ck7J2",
      Category: "Pet Essentials",
      Description: "【Dog Talking Buttons】Dog recordable button is an interesting communication tool. Recording any message or commands to repeated train your dog and teach them how to express mind. 【Make Communication Easier】Enhance the interaction between owner and pet by voice recording buttons. You will find how smart your dog is, they could identify needs by button color/position or voice. Our buttons have top quality microphones and speakers, so you can get the clear sound and better volume. 【Easy to Use】Press the REC button and start recording your voice message of 20s or less after hearing a single beep. Release the 'REC' button after finishing recording and you can hear beep-beep to signify the end of recording. Press the top button to playback the recording voice. 【Non-skid Dog Button Mat for Ease of Training】The dog communication buttons mat is made of quality rubber material, so easy to clean.  【Safe Material】Made of high quality ABS plastic. The package include manual, dog talking buttons, sticker & screwdriver. Notice: 2 AAA batteries need to be prepared by yourself." ,
      Image: "https://cdn-icons-png.flaticon.com/128/4643/4643574.png",
      Price: 20.99,
      Quantity: 0,
      Product_Name: "Dog Communication Vocal Training Button",
      Stock: 15
    },
    {
      id: "2",
      Seller_ID: "YpJWipN4827bLktnTlaI",
      Category: "Pet Essentials",
      Description: "1. Regular quantitative feeding, short-distance travel do not worry, free customization and matching to achieve healthy feeding, you are not at home, pets should also eat well, regular quantitative meals to solve feeding problems 2. Light and easy to carry, can be used in any venue, and you can take cute pets to picnics outside or anywhere 3. After 10-12H, the supporting ice pack continues to emit cold air, blocking the external heat transfer of the feeder to form a closed cold preservation space, and the long-term preservation of wet grain can reach 24 hours 4. The separation design can be disassembled and washed all over the body, and the separation design can be disassembled and washed, which is more hygienic to use without dead corners 5. Rotating snap closure to firmly prevent stealing, rotating snap closure is firm to prevent stealing, and pets cannot be opened by mistake 6. Alarm clock timing principle, long battery life, use time up to 6 months 7. Dry and wet feeding to promote nutritional balance, dry pet food can be placed in 400ML large capacity, set to provide small and medium-sized pets to eat 1 meals.",
      Image: "https://cdn-icons-png.flaticon.com/128/4643/4643574.png",
      Price: 34.89,
      Quantity: 0,
      Product_Name: "Auto Pet Feeder",
      Stock: 3 
    },
    {
      id: "3",
      Seller_ID: "I9tFzfmPLLgxSi9jVBL",
      Category: "Pet Essentials",
      Description: "Features: Made of long plush, super soft and super warm.  Comfortable touch, 4 cm long plush hair, pets love to sleep on it.  Pure color with cute design, it is a nice looking bed.  Portable and lightweight. Easy to clean and wash.  Non-toxic material with no smell, pets will easily adjust to it.  Specifications: Material: Long Plush  Colors: Pink, Gray, White, Light Gray, Brown  Sizes: S Diameter 40cm  M Diameter 50cm  L Diameter 60cm  XL Diameter 70cm  XXL Diameter 80cm  XXXL Diameter 100cm  Package Included: 1 x Pet Round Bed  Note: Please allow 1-3cm error due to manual measurement and make sure you do not mind before ordering. Please understand that colors may exist chromatic aberration as the different placement of pictures.",
      Image: "https://cdn-icons-png.flaticon.com/128/4643/4643574.png",
      Price: 45,
      Quantity: 0,
      Product_Name: "Pet Dog Donut Bed",
      Stock: 8
    },

    //the old ones had: id, image, name, quantity, price
    // price and quantity are numbers
  ];

