import abodeOne from "./assets/images/Abode_review_one.png";
import abodeTwo from "./assets/images/Abode_review_two.png";
import abodeThree from "./assets/images/Abode_review_three.png";
import abodeFour from "./assets/images/Abode_review_four.png";
import abodeFive from "./assets/images/Abode_review_five.png";
import abodeSix from "./assets/images/Abode_review_six.png";
import abodeSeven from "./assets/images/Abode_review_seven.png";
import abodeEight from "./assets/images/Abode_review_eight.png";
import abodeNine from "./assets/images/Abode_review_nine.png";
import abodeTen from "./assets/images/Abode_review_ten.png";

import sholasOne from "./assets/images/hotelsholas_review_one.png";
import sholasTwo from "./assets/images/hotelsholas_review_two.png";
import sholasThree from "./assets/images/hotelsholas_review_three.png";
import sholasFive from "./assets/images/hotelsholas_review_five.png";
import sholasSix from "./assets/images/hotelsholas_review_six.png";
import sholasSeven from "./assets/images/hotelsholas_review_seven.png";
import sholasEight from "./assets/images/hotelsholas_review_eight.png";
import sholasNine from "./assets/images/hotelsholas_review_nine.png";
import sholasTen from "./assets/images/hotelsholas_review_ten.png";

import hummingbirdOne from "./assets/images/hummingbird_review_one.png";
import hummingbirdTwo from "./assets/images/hummingbird_review_two.png";
import hummingbirdThree from "./assets/images/hummingbird_review_three.png";
import hummingbirdFour from "./assets/images/hummingbird_review_four.png";
import hummingbirdFive from "./assets/images/hummingbird_review_five.png";
import hummingbirdSix from "./assets/images/hummingbird_review_six.png";
import hummingbirdSeven from "./assets/images/hummingbird_review_seven.png";
import hummingbirdEight from "./assets/images/hummingbird_review_eight.png";
import hummingbirdNine from "./assets/images/hummingbird_review_nine.png";
import hummingbirdTen from "./assets/images/hummingbird_review_ten.png";

import veterivelOne from "./assets/images/Hotel _Veterivel_International_review_one.png";
import veterivelTwo from "./assets/images/Hotel _Veterivel_International_review_two.png";
import veterivelThree from "./assets/images/Hotel _Veterivel_International_review_three.png";
import veterivelFour from "./assets/images/Hotel _Veterivel_International_review_four.png";
import veterivelFive from "./assets/images/Hotel _Veterivel_International_review_five.png";
import veterivelSix from "./assets/images/Hotel _Veterivel_International_review_six.png";
import veterivelSeven from "./assets/images/Hotel _Veterivel_International_review_seven.png";
import veterivelEight from "./assets/images/Hotel _Veterivel_International_review_eight.png";
import veterivelNine from "./assets/images/Hotel _Veterivel_International_review_nine.png";
import veterivelTen from "./assets/images/Hotel _Veterivel_International_review_ten.png";

export interface ReviewImageRow {
  property: string;
  images: string[];
}

export const REVIEW_IMAGE_ROWS: ReviewImageRow[] = [
  {
    property: "THE ABODE BY BROWN TREE",
    images: [
      abodeOne,
      abodeTwo,
      abodeThree,
      abodeFour,
      abodeFive,
      abodeSix,
      abodeSeven,
      abodeEight,
      abodeNine,
      abodeTen,
    ],
  },
  {
    property: "SHOLAS RESIDENCY BY BROWN TREE",
    images: [
      sholasOne,
      sholasTwo,
      sholasThree,
      sholasFive,
      sholasSix,
      sholasSeven,
      sholasEight,
      sholasNine,
      sholasTen,
    ],
  },
  {
    property: "HUMMING BIRD BY BROWN TREE",
    images: [
      hummingbirdOne,
      hummingbirdTwo,
      hummingbirdThree,
      hummingbirdFour,
      hummingbirdFive,
      hummingbirdSix,
      hummingbirdSeven,
      hummingbirdEight,
      hummingbirdNine,
      hummingbirdTen,
    ],
  },
  {
    property: "HOTEL VETERIVEL INTERNATIONAL",
    images: [
      veterivelOne,
      veterivelTwo,
      veterivelThree,
      veterivelFour,
      veterivelFive,
      veterivelSix,
      veterivelSeven,
      veterivelEight,
      veterivelNine,
      veterivelTen,
    ],
  },
];
