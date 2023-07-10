import React, {useEffect, useState} from 'react';
import {View, Text, Button} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const FirestoreScreen = () => {
  const [documentData, setDocumentData] = useState(null);

  useEffect(() => {
    fetchDocument();
  }, []);

  const fetchDocument = async () => {
    try {
      const documentRef = firestore()
        .collection('UserPackageInfo')
        .doc(auth().currentUser.uid);
      const documentSnapshot = await documentRef.get();

      if (documentSnapshot.exists) {
        // Document exists, retrieve the data
        const data = documentSnapshot.data();
        setDocumentData(data);
      } else {
        // Document does not exist
        console.log('Document does not exist');
      }
    } catch (error) {
      console.log('Error fetching document:', error);
    }
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {documentData ? (
        <View>
          <Text>Selected Data:</Text>
          <Text>PackageName: {documentData.packageName}</Text>
          <Text>Description: {documentData.description}</Text>
          {/* Add more Text components for other fields you want to display */}
        </View>
      ) : (
        <Text>Loading document...</Text>
      )}

      <Button title="Fetch Document" onPress={fetchDocument} />
    </View>
  );
};

export default FirestoreScreen;
