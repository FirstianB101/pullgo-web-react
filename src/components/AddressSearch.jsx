import React, { useState, useRef } from "react";
import DaumPostcode from "react-daum-postcode";

const modalStyle = {
    // display: "block",
    position: "absolute",
    top: "430px",
    left: "600px",
    width: "700px",
    height: "500px",
    zIndex: "100",
    border: "2px solid black",
    overflow: "hidden"
};

const AddressSearch = ({
    academAddress,
    setAcademyAddress,
    academyDetailAddress,
    setAcademyDetailAddress
}) => {
    const [postCode, setPostCode] = useState(""); // 우편번호
    const [fullAddress, setFullAddress] = useState(""); // 전체 주소
    const [isDaumPost, setIsDaumPost] = useState(false);
    // "우편번호 찾기" 버튼 클릭 여부

    const inputDetailAddressRef = useRef(); // 상세 주소 input

    // "우편번호 찾기" 버튼 클릭
    const handleOpenPost = (e) => {
        setIsDaumPost(true);
    };

    const handleComplete = (data) => {
        let postCode = data.zonecode;
        let fullAddress = data.address;
        let extraAddress = "";

        if (data.addressType === "R") {
            if (data.bname !== "") extraAddress += data.bname;

            if (data.buildingName !== "") {
                extraAddress +=
                    extraAddress !== ""
                        ? `, ${data.buildingName}`
                        : data.buildingName;
            }

            // 사용자가 검색, 선택한 전체 주소
            fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";

            // 주소 검색 및 선택 후, 자동으로 "상세 주소" 입력 칸 focus
            inputDetailAddressRef.current.focus();

            // 주소 수정("우편번호 찾기"버튼 다시 클릭)을 가능하기 위한 setState
            setIsDaumPost(false);
        }

        setPostCode(postCode);
        setFullAddress(fullAddress);

        /* props로 부모 컴포넌트 CreateAcademy로부터 받은 setState 함수로
        부모의 state 변경 */
        setAcademyAddress(fullAddress);

        console.log(fullAddress);
        // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    };

    const onChangeInputDetailAddress = (e) => {
        /* props로 부모 컴포넌트 CreateAcademy로부터 받은 setState 함수로
        부모의 state 변경 */
        setAcademyDetailAddress(e.target.value);
    };

    const onClickBtnClosePost = (e) => {
        setIsDaumPost(false);
    };

    return (
        <div>
            <form className="form__address">
                <div>
                    <input
                        type="text"
                        className="postcode__input"
                        placeholder="우편번호"
                        value={postCode}
                    />
                    <input
                        type="button"
                        className="postcode_btn"
                        onClick={handleOpenPost}
                        value="우편번호 찾기"
                    />
                </div>

                <div>
                    <input
                        type="text"
                        className="address__input"
                        placeholder="주소"
                        value={fullAddress}
                    />

                    <input
                        type="text"
                        className="detail_address__input"
                        placeholder="상세 주소"
                        value={academyDetailAddress}
                        onChange={onChangeInputDetailAddress}
                        ref={inputDetailAddressRef}
                    />
                </div>
            </form>

            {isDaumPost ? (
                <div>
                    <button onClick={onClickBtnClosePost}>X</button>
                    <DaumPostcode
                        onComplete={handleComplete}
                        autoClose
                        // width={400}
                        // height={450}
                        style={modalStyle}
                        isDaumPost={isDaumPost}
                    />
                </div>
            ) : null}

            {isDaumPost ? (
                <div className="div__btn__close_post">
                    <button
                        className="btn__close_post"
                        onClick={() => setIsDaumPost(false)}
                    >
                        X 창 닫기
                    </button>
                </div>
            ) : null}
        </div>
    );
};

export default AddressSearch;
