/* eslint-disable react/prop-types */
import Call from '../Call/Call';
import './CallLog.css';
import { useCallContext } from '../../CallContext';

function CallLog({ callData }) {
  const {selectedSection,updateCallData,SetFav}=useCallContext()
  return (
    <div>
      <h2>{selectedSection}</h2>
      {
        callData.map((call) => (
          <Call key={call.id} Data={call} updateCallData={updateCallData}  SetFav={SetFav} />
        ))
      }
    </div>
  );
}

export default CallLog;
