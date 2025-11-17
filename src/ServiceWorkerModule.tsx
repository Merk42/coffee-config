import { useRegisterSW } from 'virtual:pwa-register/react';
import { useEffect } from 'react';

function ServiceWorkerModule() {
    const {
    needRefresh: [needRefresh],
    updateServiceWorker,
    } = useRegisterSW({
    onNeedRefresh() {
        console.log('New content available. Please refresh.');
    },
    onOfflineReady() {
        console.log('App is offline ready.');
    },
    });

    useEffect(() => {
    if (needRefresh) {
        if (confirm('New content available. Reload to update?')) {
        updateServiceWorker(true); // true reloads the page after update
        }
    }
    }, [needRefresh, updateServiceWorker]);

    return null; // This component doesn't render anything visible
}

export default ServiceWorkerModule;