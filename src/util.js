import {Dimensions, PixelRatio} from 'react-native';

const {width, height} = Dimensions.get('window');

export const widthToDp = number => {
    let givenWidth = typeof number === 'number' ? number : parseFloat(number);
    return PixelRatio.roundToNearestPixel((width*givenWidth)/100);
};
export const heightToDp = number => {
    let givenHeight = typeof number === 'number' ? number : parseFloat(number);
    return PixelRatio.roundToNearestPixel((height*givenHeight)/100);
};
export function normalize (size){
    const newSize = size * width / 390;
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
}
