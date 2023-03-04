import { css } from "styled-components";

import {
	DefaultButtonStyle,
	SecondaryButtonStyle,
} from "../../components/buttons/button.style";

import { MEDIA_QUERY_MD } from "../../utils/style/breakpotins";

export const SubtitleStyle = css`
	${(props) => props.theme.font.homePageSubtitle};
	text-align: center;
	margin-bottom: 12px;
`;

export const MainTitleStyle = css`
	${(props) => props.theme.font.homePageTitle};
	text-align: center;
	margin: 0 auto;
	margin-bottom: 12px;
`;

export const DescriptionStyle = css`
	${(props) => props.theme.font.homePageDescription};
	text-align: center;
	margin: 0 auto;
	margin-bottom: 12px;
`;

export const CallToActionStyle = css`
	${DefaultButtonStyle}
	font-size: 16px;
	font-weight: 500;
	width: 180px;
	height: 50px;
`;
