import React from 'react';
import { Heading, HeadingContainer, Content } from './styled'
import { wording } from './fixture'
import { SuccessIcon, FailureIcon } from '../atoms/Icons'
import { isArray } from 'util';

function headingWithContent(params) {
    const { text, children, headingType } = params
    return (
        <HeadingContainer heading={headingType}>
            <Heading text={text} heading={headingType} />
            <Content heading={headingType} >{children}</Content>
        </HeadingContainer>
    ) 
}

function renderList(list) {
    return <li key={list.id}>{list.name}</li>
}

function renderHeadingWithContent(content, heading, headingType) {
    let lists = content
    if(isArray(content) && content.length > 0) {
        lists = <ul>{content.map(renderList)}</ul>
    }
    const params = {
        text: heading,
        children: lists,
        headingType: headingType ? headingType: 'sideheading' 
    }
    return headingWithContent(params)
}

function renderWorkingHours(workingTime) {
    const children = () => {
        return (
            <React.Fragment>
                <div>{convertTime(workingTime.from) + ` to ` + convertTime(workingTime.to)}</div> 
                <div>{wording.weekendOff}</div>
            </React.Fragment>
        )
    } 
    return renderHeadingWithContent(children(), wording.workingHours)
}

function convertTime (time) {
    time = time.toString ().match (/^([1-9]|1[012])$/) || [time];
  
    if (time.length >= 1) {
        time = time.slice (1);  
        time[5] = +time[0] < 12 ? ' AM' : ' PM'; 
        time[0] = +time[0] % 12 || 12; 
    }
    return time.join (''); 
  }
  
function renderVisaInfo(visaInfo) {
    const { visaType, visaDuration, visaLink } = visaInfo
    const { visaTypeHeading, visaDurationHeading, visaLinkHeading, visaHeading } = wording
    const listData = () => {
        return (
            <React.Fragment>
                {visaType && renderHeadingWithContent(visaType, visaTypeHeading, `smallheading`)}
                {visaDuration && renderHeadingWithContent(visaDuration, visaDurationHeading, `smallheading`)}
                {visaLink && renderHeadingWithContent(visaLink, visaLinkHeading, `smallheading`)}
            </React.Fragment>
        )
    }
    return renderHeadingWithContent(listData(), visaHeading)
}
 
function renderTextWithIcon(itemsCovered, text) {
    if(itemsCovered === 'false' || itemsCovered === 'Provided') {
        const headingIcon = itemsCovered === 'false'
            ? <FailureIcon />
            : <SuccessIcon />
        return renderHeadingWithContent(text, headingIcon, `pointheading`)
    }
}

function renderLogistics(logisticsInfo) {
    const { foodCovered, foodProvided, accommodationCovered, accommodationProvided } = logisticsInfo
    const { accommodationProvidedText, accommodationCoveredText, foodProvidedText, foodCoveredText, logistics} = wording
    const listData = () => {
        return (
            <React.Fragment>
                {foodCovered && renderTextWithIcon(foodCovered, foodCoveredText)}
                {foodProvided && renderTextWithIcon(foodProvided, foodProvidedText)}
                {accommodationProvided && renderTextWithIcon(accommodationProvided, accommodationProvidedText)}
                {accommodationCovered && renderTextWithIcon(accommodationCovered, accommodationCoveredText)}
            </React.Fragment>
        )
    }
    return renderHeadingWithContent(listData(), logistics)
}
  
function convertDate(date) {
    date = new Date(date).toString()
    const newMonth = date.slice(4,7)
    const newDate = date.slice(8,10)
    const newYear = date.slice(11,15)
    date = newDate + ' ' + newMonth + ' ' + newYear
    return date
}

export {
    renderHeadingWithContent,
    headingWithContent,
    renderWorkingHours,
    renderVisaInfo,
    renderLogistics,
    convertDate
}