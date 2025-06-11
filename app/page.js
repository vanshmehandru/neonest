'use client'

import React, { useEffect, useState } from 'react';
import { Button } from './components/ui/Button'; 
import {Toggle} from './components/ui/toggle';
import {ToggleGroup} from './components/ui/togglegroup';
import {Tooltip, TooltipTrigger, TooltipContent, TooltipProvider} from './components/ui/tooltip';

const Page = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile(); // initial check
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div>
      <h2>Starting NeoNest: Homepage</h2>
      <Button>Click me</Button>

      <p style={{ marginTop: '10px' }}>
        {isMobile ? "📱 You are on a mobile device" : "💻 You are on a desktop"}
      </p>

      <div style={{ marginTop: '20px' }}>
        <h3>Toggle Example</h3>
        <Toggle>Toggle Me</Toggle>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h3>Toggle Group</h3>
        <ToggleGroup>
          <Toggle value="bold">B</Toggle>
          <Toggle value="italic">I</Toggle>
          <Toggle value="underline">U</Toggle>
        </ToggleGroup>
      </div>

      <div style={{ marginTop: '20px' }}>
        <TooltipProvider>
      <div>
        <h3>Tooltip Example</h3>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button>Hover me</Button>
          </TooltipTrigger>
          <TooltipContent>
            This is a tooltip message
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
      </div>
    </div>
  );
};

export default Page;
