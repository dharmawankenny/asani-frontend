import React from 'react';
import { Testimonies, Testimony, Wrapper, Avatar, Name, Message } from './TestimoniesMap.styled';
import testimonies from './testimonies';

export default function TestimoniesMap() {
  return (
    <Wrapper>
      <h3>{'Testimoni Pelanggan'}</h3>
      <Testimonies>
        {testimonies.map(testimony => (
          <Testimony key={testimony.id}>
            <Avatar src={testimony.avatarUrl} />
            <Name>{`${testimony.name}, ${testimony.age} tahun`}</Name>
            <Message>{testimony.message}</Message>
          </Testimony>
        ))}
      </Testimonies>
    </Wrapper>
  );
}
