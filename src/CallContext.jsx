import  { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CallContext = createContext();

export const CallProvider = ({ children }) => {
  const [callData, setCallData] = useState([]);
  const [selectedSection, setSelectedSection] = useState('AllCalls');
  const [Fav, SetFav] = useState([]);

  const updateCallData = (newData) => {
    setCallData(newData);
  };

  const updateSelectedSection = (section) => {
    setSelectedSection(section);
  };

  const archiveCall = async (callId) => {
    try {
      await axios.patch(`https://charming-bat-singlet.cyclic.app/https://cerulean-marlin-wig.cyclic.app/activities/${callId}`, {
        is_archived: true,
      });
      // Move the call from the main array to the archived array
      setCallData((prevData) =>
        prevData.map((call) =>
          call.id === callId ? { ...call, is_archived: true } : call
        )
      );
    } catch (error) {
      console.error('Error archiving the call:', error);
    }
  };

  const unarchiveCall = async (callId) => {
    try {
      await axios.patch(`https://charming-bat-singlet.cyclic.app/https://cerulean-marlin-wig.cyclic.app/activities/${callId}`, {
        is_archived: false,
      });
      // Move the call from the archived array to the main array
      setCallData((prevData) =>
        prevData.map((call) =>
          call.id === callId ? { ...call, is_archived: false } : call
        )
      );
    } catch (error) {
      console.error('Error unarchiving the call:', error);
    }
  };

  // Fetch data and update context on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://cerulean-marlin-wig.cyclic.app/activities');
        updateCallData(response.data);
      } catch (error) {
        console.error(error.response);
      }
    };

    fetchData();
  }, []);

  const values = {
    callData,
    updateCallData,
    selectedSection,
    updateSelectedSection,
    Fav,
    SetFav,
    archiveCall,
    unarchiveCall,
  };

  return (
    <CallContext.Provider value={values}>
      {children}
    </CallContext.Provider>
  );
};

export const useCallContext = () => {
  return useContext(CallContext);
};
