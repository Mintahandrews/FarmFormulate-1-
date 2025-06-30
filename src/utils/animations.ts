import gsap from 'gsap';

export const fadeIn = (element: string | Element, delay: number = 0, duration: number = 0.5) => {
  return gsap.fromTo(
    element,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration, delay, ease: 'power2.out' }
  );
};

export const fadeOut = (element: string | Element, delay: number = 0, duration: number = 0.5) => {
  return gsap.to(element, { 
    opacity: 0, 
    y: -20, 
    duration, 
    delay,
    ease: 'power2.in' 
  });
};

export const staggeredFadeIn = (elements: string | Element[], stagger: number = 0.1, delay: number = 0, duration: number = 0.5) => {
  return gsap.fromTo(
    elements,
    { opacity: 0, y: 20 },
    { 
      opacity: 1, 
      y: 0, 
      duration, 
      delay, 
      stagger, 
      ease: 'power2.out' 
    }
  );
};

export const scaleIn = (element: string | Element, delay: number = 0, duration: number = 0.5) => {
  return gsap.fromTo(
    element,
    { opacity: 0, scale: 0.8 },
    { opacity: 1, scale: 1, duration, delay, ease: 'back.out(1.7)' }
  );
};

export const slideIn = (element: string | Element, direction: 'left' | 'right' | 'top' | 'bottom', distance: number = 50, delay: number = 0, duration: number = 0.5) => {
  const xFrom = direction === 'left' ? -distance : direction === 'right' ? distance : 0;
  const yFrom = direction === 'top' ? -distance : direction === 'bottom' ? distance : 0;
  
  return gsap.fromTo(
    element,
    { opacity: 0, x: xFrom, y: yFrom },
    { opacity: 1, x: 0, y: 0, duration, delay, ease: 'power2.out' }
  );
};

export const pulse = (element: string | Element, scale: number = 1.05, duration: number = 0.3) => {
  return gsap.to(element, {
    scale: scale,
    duration: duration,
    repeat: 1,
    yoyo: true,
    ease: 'power1.inOut'
  });
};

export const shake = (element: string | Element, intensity: number = 5, duration: number = 0.3) => {
  return gsap.to(element, {
    x: `random(-${intensity}, ${intensity})`,
    y: `random(-${intensity/2}, ${intensity/2})`,
    duration: duration / 4,
    repeat: 3,
    ease: 'none',
    yoyo: true,
    clearProps: 'x,y'
  });
};

export const bounceIn = (element: string | Element, delay: number = 0, duration: number = 0.5) => {
  return gsap.fromTo(
    element,
    { opacity: 0, scale: 0.3 },
    { 
      opacity: 1, 
      scale: 1, 
      duration, 
      delay, 
      ease: "elastic.out(1, 0.3)" 
    }
  );
};

export const highlight = (element: string | Element, color: string = 'rgba(134, 239, 172, 0.3)', duration: number = 1) => {
  return gsap.fromTo(
    element,
    { backgroundColor: color },
    { 
      backgroundColor: 'transparent', 
      duration, 
      ease: 'power2.out',
    }
  );
};
