import React, {useEffect, useState} from 'react';
import {View, Text, Button} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

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

  const deleteDocument = async () => {
    try {
      const documentRef = firestore()
        .collection('UserPackageInfo')
        .doc(auth().currentUser.uid);
      await documentRef.delete();

      console.log('Document deleted successfully');
      setDocumentData(null); // Clear the document data after deletion
    } catch (error) {
      console.log('Error deleting document:', error);
    }
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {documentData ? (
        <View>
          <Text>Document List:</Text>
          <Text>Name: {documentData.packageName}</Text>
          <Text>Email: {documentData.packagePrice}</Text>
          <Text>Package Location: {documentData.location}</Text>
          {/* Add more Text components for other fields you want to display */}
        </View>
      ) : (
        <Text>Loading document...</Text>
      )}

      {documentData && (
        <Button title="Delete Document" onPress={deleteDocument} />
      )}
    </View>
  );
};

export default FirestoreScreen;
