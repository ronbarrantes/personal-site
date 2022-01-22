import React from 'react'
import './styles.css'

interface WrapperProps {
	children: React.ReactNode;
	cssClass?: string;
}

const Wrapper = ({ cssClass, children }: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & WrapperProps) => (
  <div className={`wrapper ${cssClass}`}>
    { children }
  </div>
)

export default Wrapper