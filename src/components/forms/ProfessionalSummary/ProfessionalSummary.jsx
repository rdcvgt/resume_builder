import React, { useState, useEffect } from "react";
import styled from "styled-components";
import InputEditor from "../utils/Editor";
import PropTypes from "prop-types";
import TitleBlock from "../utils/TitleBlock";

const BlockContainer = styled.div`
	width: 90%;
	height: auto;
	margin: 50px auto;
`;

const BlockTitle = styled.div`
	margin-bottom: 20px;
	${(props) => props.theme.font.blockTitle};
	color: ${(props) => props.theme.color.neutral[90]};
`;

const BlockDescription = styled.div`
	${(props) => props.theme.input.title};
	line-height: 1.5em;
	height: auto;
	margin: 0 0 20px 0;
`;

const LongInputBox = styled.div``;

ProfessionalSummary.propTypes = {
	handleInputData: PropTypes.func,
};

export default function ProfessionalSummary({ handleInputData }) {
	const [timer, setTimer] = useState(null);
	const [professionalSummary, setProfessionalSummary] = useState({
		blockTitle: null,
		inputHtml: null,
	});
	const [blockTitle, setBlockTitle] = useState("個人簡介");
	const [inputHtml, setInputHtml] = useState(null);

	//從子組件取得 inputHtml，並儲存 state
	const handleEditorInput = (inputHtml) => {
		setInputHtml(inputHtml);
	};

	//若使用者閒置輸入超過 1 秒，則 setProfessionalSummary
	const updateInputData = (inputName, state) => {
		clearTimeout(timer);
		const newTimer = setTimeout(() => {
			//保留先前已儲存的其他 state 資料，只改變有變動的項目
			setProfessionalSummary((preData) => ({
				...preData,
				[inputName]: state,
			}));
		}, 1000);
		setTimer(newTimer);
	};

	//表格項目有變動 state，則呼叫 updateInputData
	useEffect(() => {
		updateInputData("blockTitle", blockTitle);
	}, [blockTitle]);

	useEffect(() => {
		updateInputData("inputHtml", inputHtml);
	}, [inputHtml]);

	//當 professionalSummary 變動時，呼叫父層組件函式 handleInputData
	useEffect(() => {
		let data = { professionalSummary };
		handleInputData(data);
	}, [professionalSummary]);

	return (
		<BlockContainer>
			<TitleBlock title={{ blockTitle, setBlockTitle }} />
			<BlockDescription>
				可以寫上 2 到 4 句話讓查看履歷的人對你產生興趣，
				像是闡述你的個人特質或過去經驗，
				最重要的是記得提及你的亮眼成就與專業技能！
			</BlockDescription>
			<LongInputBox>
				<InputEditor handleEditorInput={handleEditorInput} />
			</LongInputBox>
		</BlockContainer>
	);
}
