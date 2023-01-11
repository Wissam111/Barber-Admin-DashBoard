function SelectImageView(props) {
  const { onSelectFile, selectedFile, currImg } = props;
  return (
    <div className="select-file-wrapper">
      {selectedFile ? (
        <img src={selectedFile.preview} className="add-userImage-primary" />
      ) : currImg ? (
        <img
          src={`http://ec2-13-231-177-94.ap-northeast-1.compute.amazonaws.com/imgs/${currImg}`}
          className="add-userImage-primary"
        />
      ) : (
        <img
          src={require("../../assets/imgs/unknown.png")}
          className="add-userImage-primary"
        />
      )}

      <label onChange={onSelectFile} htmlFor="formId">
        <p>select image</p>
        <input name="" type="file" id="formId" hidden />
        <img src={require("../../assets/icons/add-image.png")} />
      </label>
    </div>
  );
}

export default SelectImageView;
