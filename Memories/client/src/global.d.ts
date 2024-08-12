declare module "*.png" {
  const value: string;
  export default value;
}

declare module "react-file-base64" {
  export default class FileBase64 extends React.Component<any> {}
}
