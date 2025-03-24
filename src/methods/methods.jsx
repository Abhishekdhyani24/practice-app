import environment from "../environment";
import CryptoJS from "crypto-js";

// Function to encode a data
const encodeData = (data) => {
  if (data) {
    const ciphertext = CryptoJS.AES.encrypt(data, environment.cryptoSecretKey).toString();
    // Replace `/` with `_` and `+` with `-` to make it URL-safe (base64url encoding)
    const safeCiphertext = ciphertext.replace(/\//g, "_").replace(/\+/g, "-");
    return safeCiphertext
  } else {
    return ""
  }
};

// Function to decode an encoded data
const decodeData = (data) => {
  if (data) {
    // Replace `_` back to `/` and `-` back to `+` before decrypting
    const safeData = data.replace(/_/g, "/").replace(/-/g, "+");
    const bytes = CryptoJS.AES.decrypt(safeData, environment.cryptoSecretKey);
    const originalMessage = bytes.toString(CryptoJS.enc.Utf8);
    return originalMessage
  } else {
    return ""
  }
};

const isTranslatePage = () => {
  let value = false;
  let url = window.location.href;
  if (url.includes("translation")) value = true;
  return value;
};

const generatekeysArr = (arr, key = "typeofresult") => {
  let keys = {};
  if (!arr) return { keys, arr: [] };
  arr.map((itm) => {
    if (keys[itm[key]]) {
      keys[itm[key]].push(itm);
    } else {
      keys[itm[key]] = [itm];
    }
  });
  return {
    keys,
    arr: Object.keys(keys).map((itm) => {
      return { key: itm, value: keys[itm] };
    }),
  };
};

const userImg = (img, modal = 'img') => {
  let value = "/images/person.jpg";
  // if (img) value = environment.api + 'img/' + img
  // if (img) value = img;
  if (img) value = `${environment.api}${img}`;
  return value;
};

const noImg = (img, modal = "img") => {
  let value = "/images/placeholder.png";
  // if (img) value = environment.api + 'img/' + img
  if (img?.includes("http")) value = img;
  else if (img) value = `${environment.api}static/${img}`;
  else value = "/images/placeholder.png";
  return value;
};

const video = (video, modal = 'videos') => {
  let value = "";
  if (video) value = video;
  // if (video) value = `${environment.api}/videos/${video}`;
  return value;
};

const document = (img, modal = "img") => {
  let value = "/images/placeholder.png";
  // if (img) value = environment.api + 'img/' + img
  if (img) value = img;
  // if (img) value = `${environment.api}document/${img}`;
  return value;
};

const getPrams = (p) => {
  const params = new URLSearchParams(window.location.search);
  return params.get(p);
};

const isNumber = (e) => {
  let key = e.target;
  let maxlength = key.maxLength ? key.maxLength : 1;

  let max = Number(key.max ? key.max : key.value);
  if (Number(key.value) > max) key.value = max;

  if (key.value.length > maxlength && maxlength > 0) key.value = key.value.slice(0, maxlength);
  key.value = key.value.replace(/[^0-9.]/g, "").replace(/(\..*?)\..*/g, "$1");

  return key.value;
};

const isLatitudeValid = (e) => {
  let key = e.target;
  let maxlength = key.maxLength ? key.maxLength : 1;
  let max = 90;
  let min = -90;
  if (Number(key.value) > max) key.value = max;
  if (Number(key.value) < min) key.value = min;
  if (key.value.length > maxlength && maxlength > 0) key.value = key.value.slice(0, maxlength);
  key.value = key.value.replace(/[^0-9.-]/g, "")  // Remove all non-numeric characters except dot and negative sign
    .replace(/(\..*?)\..*/g, "$1") // Allow only one decimal point
    .replace(/^-(?=\D)/, "");  // Remove leading negative if not followed by a digit
  let num = parseFloat(key.value);
  if (num < min) key.value = min;
  if (num > max) key.value = max;

  return key.value;
};

const isLongitudeValid = (e) => {
  let key = e.target;
  let maxlength = key.maxLength ? key.maxLength : 1;
  let max = 180;
  let min = -180;
  if (Number(key.value) > max) key.value = max;
  if (Number(key.value) < min) key.value = min;
  if (key.value.length > maxlength && maxlength > 0) key.value = key.value.slice(0, maxlength);
  key.value = key.value.replace(/[^0-9.-]/g, "")  // Remove all non-numeric characters except dot and negative sign
    .replace(/(\..*?)\..*/g, "$1") // Allow only one decimal point
    .replace(/^-(?=\D)/, "");  // Remove leading negative if not followed by a digit
  let num = parseFloat(key.value);
  if (num < min) key.value = min;
  if (num > max) key.value = max;
  return key.value;
};


const isRatio = (e) => {
  let key = e.target;
  let maxlength = key.maxLength ? key.maxLength : 1;

  let max = Number(key.max ? key.max : key.value);
  if (Number(key.value) > max) key.value = max;

  // let min = key.min;
  // if (min && Number(key.value)<Number(min)) key.value = min;

  if (key.value.length > maxlength) key.value = key.value.slice(0, maxlength);
  key.value = key.value.replace(/[^0-9.>]/g, "").replace(/(\..*?)\..*/g, "$1");

  return key.value;
};

const find = (arr, value, key = "key") => {
  let ext = arr?.find((itm) => itm[key] == value);
  return ext;
};

/* ###################### Form Methods #########################  */

// get Single field error
const getError = (key, fvalue, formValidation) => {
  let ext = find(formValidation, key);
  let res = matchError(ext, fvalue);
  return res;
};

const emailRequiredFor = (role) => {
  let value = false;
  if (
    role == "Clinic Admin" ||
    role == "Counsellor" ||
    role == "Owner" ||
    role == "admin"
  )
    value = true;
  return value;
};

const validateUsername = (val) => {
  return /^(?=[a-zA-Z0-9._-]{8,20}$)(?!.*[_.-]{2})[^_.-].*[^_.-]$/.test(val);
};

const dialMatch = (val) => {
  let value = false;
  value = val.match(/^(?=.*[0-9])(?=.*[+])[0-9+]{2,5}$/);
  return value;
};
const emailvalidation = (val) => {
  if (
    val.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  ) {
    return true;
  }
  // if(!val.includes(".")){
  //     return false
  // }
  return false;
};
const passwordValidation = (val) => {
  // Check if the password length is between 8 and 16 characters
  if (val.length < 8 || val.length > 16) {
    return false;
  }
  // Regular expression to check for at least one lowercase letter, one uppercase letter, one number, and one special character
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,16}$/;
  if (val.match(passwordRegex)) {
    return true;
  }
  return false;
};
const passwordValidationMessages = (val) => {
  if (val.length < 8) {
    return ('Password must be at least 8 characters');
  } else if (val.length > 16) {
    return ('Password must be at most 16 characters');
  }
  if (!/[a-z]/.test(val)) {
    return ('Password requires one lowercase letter');
  }
  if (!/[A-Z]/.test(val)) {
    return ('Password requires one uppercase letter');
  }
  if (!/\d/.test(val)) {
    return ('Password requires one numeric character');
  }
  if (!/[@$!%*?&]/.test(val)) {
    return ('Password requires one special character');
  }
};

const urlValidation = (val) => {
  if (
    val.match(
      /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/
    )
  ) {
    return true;
  }
  // if(!val.includes(".")){
  //     return false
  // }
  return false;
};
// match errors for fields
const matchError = (ext, fValue) => {
  let invalid = false;
  let kValue = fValue[ext.key];
  let value = {
    minLength: false,
    maxLength: false,
    confirmMatch: false,
    required: false,
  };
  let message = "";
  if (ext.required) {
    if (!kValue || (!kValue.length && typeof kValue != "object")) {
      invalid = true;
      message = ext?.message || "This is Required";
    }
  }
  if (ext.minLength && kValue) {
    if (kValue.length < ext.minLength) {
      value.minLength = true;
      message = ext?.message || `Min Length is ${ext.minLength}`;
    }
  }
  if (ext.email && kValue) {
    if (!emailvalidation(kValue)) {
      value.email = true;
      message = ext?.message || `Email is invalid`;
    }
  }
  if (ext.maxLength && kValue) {
    if (kValue.length > ext.maxLength) {
      value.maxLength = true;
      message = ext?.message || `Max Length is ${ext.maxLength}`;
    }
  }
  if (ext.dialCode && kValue) {
    if (dialMatch(kValue)) {
      kValue.indexOf("+");
      if (kValue.indexOf("+") != 0) {
        value.dialCode = true;
        message = ext?.message || `DialCode is Invalid`;
      }
    } else {
      value.dialCode = true;
      message = ext?.message || `DialCode is Invalid`;
    }
  }

  if (ext.username && kValue) {
    if (!validateUsername(kValue)) value.username = true;
  }

  if (ext.confirmMatch && kValue) {
    if (fValue[ext.confirmMatch[0]] != fValue[ext.confirmMatch[1]]) {
      value.confirmMatch = true;
      message = ext?.message || `Confirm Password is not matched`;
    }
  }

  let vArr = Object.keys(value);
  vArr.map((itm) => {
    if (value[itm]) invalid = true;
  });

  let res = { invalid: invalid, err: value, message };
  return res;
};

// get form error (All Fields)
const getFormError = (formValidation, fvalue) => {
  let invalid = false;
  formValidation.map((ext) => {
    if (matchError(ext, fvalue).invalid) {
      invalid = true;
    }
  });

  return invalid;
};

/* ###################### Form Methods end #########################  */

const route = (route) => {
  var linkTag = window.document.createElement('a');
  var linkText = window.document.createTextNode("Redirect Link Tag");
  linkTag.appendChild(linkText);
  linkTag.href = route;
  linkTag.style.display = 'hidden';
  window.document.body.appendChild(linkTag);
  linkTag.click();
  window.document.body.removeChild(linkTag);
};

const flagIcon = (icon = "", width = 50) => {
  const imageErr = (e) => {
    e.target.src = "/images/placeholder.png";
  };
  return (
    <>
      <img
        src={`https://flagsapi.com/${icon?.toUpperCase()}/flat/64.png`}
        width={width}
        onError={imageErr}
      />
    </>
  );
};

function containsSpaceonly(text) {
  return /\s/.test(text);
}

const msToTime = (milliseconds, ago = true) => {
  //get hours from milliseconds
  var hours = milliseconds / (1000 * 60 * 60);
  var absoluteHours = Math.floor(hours);
  var h = absoluteHours;
  //get remainder from hours and convert to minutes
  var minutes = (hours - absoluteHours) * 60;
  var absoluteminutes = Math.floor(minutes);
  var m = absoluteminutes;

  //get remainder from minutes and convert to seconds
  var seconds = (minutes - absoluteminutes) * 60;
  var absoluteseconds = Math.floor(seconds);
  var s = absoluteseconds;

  var time = "";
  if (h > 0) {
    time += `${h}h`;
  }
  if (m > 0) {
    time += ` ${m}m`;
  }

  if (ago) {
    if (h == 0 && m == 0) {
      time += `a few seconds`;
    }
    time += " ago";
  }
  return time;
};

const multipleImageValidation = (files, acceptedTypes, size, maxImages = "") => {
  const filteredFiles = [];
  const invalidFiles = [];
  const sizeLimits = { min: size?.min * 1024 * 1024, max: size?.max * 1024 * 1024 }; // Size limits in bytes

  if (maxImages) {
    // Check for the maximum number of files
    if (files.length > maxImages) {
      return {
        filteredFiles: [],
        invalidFiles: files,
        errorMsg: `You can only upload ${maxImages} images.`
      };
    }
  }

  files.forEach(file => {
    const isValidType = acceptedTypes.includes(file.type);
    const isValidSize = file.size >= sizeLimits.min && file.size <= sizeLimits.max;

    if (isValidType && isValidSize) {
      filteredFiles.push(file);
    } else {
      invalidFiles.push(file);
    }
  });
  let errorMsg = '';
  const acceptedTypesString = acceptedTypes
    .map(type => type.split('/')[1].toUpperCase()) // Remove "image/" prefix
    .join(', '); // Join and format accepted types
  if (invalidFiles.length > 0) {
    errorMsg = invalidFiles.length > 1
      ? `Some files are not valid format or exceed the size limit and will be ignored. Only ${acceptedTypesString} images between ${size?.min} MB and ${size?.max} MB are allowed.`
      : `Only ${acceptedTypesString} images between ${size?.min} MB and ${size?.max} MB are allowed.`;
  }

  return { filteredFiles, invalidFiles, errorMsg };
};

const multipleVideoValidation = (files, acceptedTypes, size, maxVideos = "") => {
  const filteredFiles = [];
  const invalidFiles = [];
  const sizeLimits = { min: size?.min * 1024 * 1024, max: size?.max * 1024 * 1024 }; // Size limits in bytes

  if (maxVideos) {
    // Check for the maximum number of files
    if (files.length > maxVideos) {
      return {
        filteredFiles: [],
        invalidFiles: files,
        errorMsg: `You can only upload ${maxVideos} videos.`
      };
    }
  }

  files.forEach(file => {
    const isValidType = acceptedTypes.includes(file.type);
    const isValidSize = file.size >= sizeLimits.min && file.size <= sizeLimits.max;

    if (isValidType && isValidSize) {
      filteredFiles.push(file);
    } else {
      invalidFiles.push(file);
    }
  });

  let errorMsg = '';
  const acceptedTypesString = acceptedTypes
    .map(type => type.split('/')[1].toUpperCase()) // Remove "video/" prefix
    .join(', '); // Join and format accepted types
  if (invalidFiles.length > 0) {
    errorMsg = invalidFiles.length > 1
      ? `Some files are not valid videos and will be ignored. Only ${acceptedTypesString} videos between ${size?.min} MB and ${size?.max} MB are allowed.`
      : `Only ${acceptedTypesString} videos between ${size?.min} MB and ${size?.max} MB are allowed.`;
  }

  return { filteredFiles, invalidFiles, errorMsg };
};

const isAllow = (user,key = "") => {
  if (user?.role === "admin") return true;
  let value = false
  if(user?.permissions?.[key]){
    value = user?.permissions?.[key];
  }
  return value;
}

const methodModel = {
  userImg,
  video,
  route,
  flagIcon,
  isNumber,
  isRatio,
  find,
  getError,
  getFormError,
  getPrams,
  emailRequiredFor,
  emailvalidation,
  passwordValidation,
  passwordValidationMessages,
  noImg,
  isTranslatePage,
  generatekeysArr,
  containsSpaceonly,
  msToTime,
  urlValidation,
  document,
  multipleImageValidation,
  multipleVideoValidation,
  encodeData,
  decodeData,
  isLongitudeValid,
  isLatitudeValid,
  isAllow
};
export default methodModel;