import React, { useEffect, useRef, useState } from 'react';

interface AutoIframeProps {
    src: string;
    title: string;
}

export const AutoIframe: React.FC<AutoIframeProps> = ({ src, title }) => {
    const iframeRef = useRef<HTMLIFrameElement>({ current: null } as HTMLIFrameElement);
    const [iframeHeight, setIframeHeight] = useState('0px');
    const onLoad = () => {
        setIframeHeight(ref.current.contentWindow.document.body.scrollHeight + "px");
    };

    // useEffect(() => {
    //     const handleResize = () => {
    //         if (iframeRef.current) {
    //             setIframeHeight(`${iframeRef.current.contentWindow?.document.body.scrollHeight}px`);
    //         }
    //     };
    //
    //     if (iframeRef.current) {
    //         iframeRef.current.addEventListener('load', handleResize);
    //         window.addEventListener('resize', handleResize);
    //     }
    //
    //     return () => {
    //         if (iframeRef.current) {
    //             iframeRef.current.removeEventListener('load', handleResize);
    //         }
    //         window.removeEventListener('resize', handleResize);
    //     };
    // }, []);

    return (
        <div className="w-full overflow-hidden">
            <iframe
                onLoad={onLoad}
                ref={iframeRef}
                src={src}
                height="550px"
                title={title}
                width="100%"
                frameBorder="0"
                scrolling="no"
                className="w-full border-none transition-height duration-500 ease-in-out overflow-hidden"
            />
        </div>
    );
};