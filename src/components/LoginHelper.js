import React, { useState, useRef } from 'react'
import { useTransition, useSpring, useChain, config } from 'react-spring'
import { Global, Container, Item } from './LoginStyles'
import data from './LoginItemData'

export default function LoginHelper() {
  const [open, set] = useState(false);

  const springRef = useRef();
  const { size, opacity, ...rest } = useSpring({
    ref: springRef,
    config: config.stiff,
    from: { size: '20%', background: 'linear-gradient(135deg, #c1dfc4 0%, #deecdd 100%)', color: 'gray' },
    to: { size: open ? '100%' : '20%', background: open ? 'white' : 'green' }
  });

  const transRef = useRef();
  const transitions = useTransition(open ? data : [], item => item.name, {
    ref: transRef,
    unique: true,
    trail: 400 / data.length,
    from: { opacity: 0, transform: 'scale(0)' },
    enter: { opacity: 1, transform: 'scale(1)' },
    leave: { opacity: 0, transform: 'scale(0)' }
  });

  useChain(open ? [springRef, transRef] : [transRef, springRef], [0, open ? 0.1 : 0.6]);

  return (
    <>
      <Global />
      <Container style={{ ...rest, width: size, height: size }} onClick={() => set(open => !open)}>
        Don't have an account? Click here!
        {transitions.map(({ item, key, props }) => (
          <Item key={key} style={{ ...props, background: item.css, padding: item.padding, color: item.color, overflow: 'auto' }} >
            {item.txtContent}
            <br></br>
            {item.txtContent2}
          </Item>
        ))}
      </Container>
    </>
  );
}

