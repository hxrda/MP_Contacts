import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, FlatList } from "react-native";
import * as Contacts from "expo-contacts";

export default function App() {
	//States:
	const [allContacts, setAllContacts] = useState([]);

	//Functions:
	const getContacts = async () => {
		const { status } = await Contacts.requestPermissionsAsync();

		if (status == "granted") {
			const { data } = await Contacts.getContactsAsync({
				fields: [Contacts.Fields.PhoneNumbers],
			});

			//console.log(data[0]);
			//console.log(data);

			if (data.length > 0) {
				setAllContacts(data);
			}
		}
	};

	//Rendering:
	return (
		<View style={styles.container}>
			<FlatList
				data={allContacts}
				renderItem={({ item }) => (
					<View style={{ marginTop: 5 }}>
						<Text>
							{item.name}, {item.phoneNumbers[0].number}
						</Text>
					</View>
				)}
			/>
			<Button title="Get Contacts" onPress={getContacts} />
			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
		marginTop: 60,
		marginBottom: 20,
	},
});
