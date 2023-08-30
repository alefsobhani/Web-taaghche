
import { reportWebVitals as reportWebVitalsBase } from 'react-dom';

const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    reportWebVitalsBase(onPerfEntry);
  }
};

export default reportWebVitals;
