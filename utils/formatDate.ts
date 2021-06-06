// import moment from 'moment-timezone';

const formatDate: (
  dateString: string | Date,
  options?: { withDetails?: boolean },
) => string = (dateString, { withDetails } = { withDetails: false }) => {
  const date = new Date(dateString);

  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 
  ${
    withDetails
      ? `${date.getHours() >= 12 ? '오후' : '오전'} ${
          date.getHours() >= 12 ? date.getHours() - 12 : date.getHours()
        }:${
          date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
        }분`
      : ''
  }`;
};

export default formatDate;
