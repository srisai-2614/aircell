import axios from 'axios';
import { useEffect } from 'react';
import CallLog from '../../widgets/CallLog/CallLog';
import { useCallContext } from '../../CallContext';

function Content() {
  const { updateCallData, selectedSection, callData, Fav } = useCallContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://cerulean-marlin-wig.cyclic.app/activities');
        updateCallData(response.data); // Set the actual array, not the string representation
      } catch (error) {
        console.error(error.response);
      }
    };

    fetchData();
  }, []);

  const filteredCalls = () => {
    switch (selectedSection) {
      case 'Archive':
        return callData.filter((call) => call.is_archived);
      case 'Favorite':
        return Fav;
      default:
        return callData.filter((call) => !call.is_archived);
    }
  };

  const Filtered = filteredCalls();

  return (
    <div>
      {Filtered ? (
        <CallLog callData={Filtered} />
      ) : (
        <h3>No calls</h3>
      )}
    </div>
  );
}

export default Content;
