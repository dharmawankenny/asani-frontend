import styled from 'styled-components';

export const Testimonies = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

export const Testimony = styled.div`
  flex: 0 50%;
  margin-bottom: 30px;
  &:nth-child(odd) {
    padding-right: 1rem;
  }
  text-align: center;
`;

export const Wrapper = styled.div`
  max-width: 32rem;
  margin: 2rem auto 0;
  padding: 0 1.5rem 3rem;
  h3 {
    font-size: 1.25rem;
    color: #42526e;
    margin: 0 0 1rem;
    width: 100%;
    text-align: center;
    padding: 0 16px 16px;
    font-weight: 700;
    line-height: 1.5;
  }
`;

export const Avatar = styled.img`
  width: 5rem;
  height: 5rem;
  object-fit: contain;
  border-radius: 5rem;
  box-shadow: 0 0.0675rem 0.5rem 0 rgba(9, 30, 66, 0.15);
  border: 0.1rem solid #ffffff;
`;

export const Name = styled.div`
  width: 100%;
  line-height: 1.25;
  text-align: center;
  color: #42526e;
  font-size: 1rem;
  font-weight: 700;
  margin: 0.75rem 0 0;
`;

export const Message = styled.div`
  width: 100%;
  line-height: 1.25;
  text-align: center;
  color: #42526e;
  font-size: 12px;
  font-weight: 400;
  margin: 0.25rem 0 0;
`;
