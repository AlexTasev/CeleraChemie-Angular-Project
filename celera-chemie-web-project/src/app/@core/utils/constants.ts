export default class Constants {
  public static readonly emailRegex = new RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );

  public static readonly phoneNumberRegex = new RegExp(
    /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/
  );

  public static readonly specialCharsShortRegex = new RegExp(
    /^(?!\s*$)(?!.*\s$)(?![-\s])[^`=~!@#$^*\[\]\/\\{}"|<>?]{1,100}$/,
  );

  public static readonly specialCharsLongRegex = new RegExp(
    /^(?!\s*$)(?!.*\s$)(?![-\s])[^`=~!@#$^*\[\]\/\\{}"|<>?]{1,3000}$/,
  );

  public static readonly urlRegex = new RegExp(
    /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
  );
}
