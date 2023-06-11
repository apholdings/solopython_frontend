'use client';

interface ContainerProps {
  children: React.ReactNode;
}

export default function Container({ children }: ContainerProps) {
  return <div>{children}</div>;
}
