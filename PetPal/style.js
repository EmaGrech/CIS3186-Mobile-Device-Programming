import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    listContainer: {
        padding: 10,
    },
    listItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    listImage: {
        width: 100,
        height: 100,
        marginRight: 10,
    },
    listTextContainer: {
        flex: 1,
    },
    listProductName: {
        fontSize: 16,
        marginBottom: 5,
    },
    listPrice: {
        marginTop: 5,
        fontWeight: 'bold',
    },
        drop: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
    },
    formInput: {
        borderColor: 'gray',
        borderWidth: 1,
        padding: 5,
        height: 40,
        marginBottom: 5,
        borderRadius: 10,
        width: 280,
    },
    formButton: {
        backgroundColor: '#70afe6',
        padding: 10,
        alignItems: 'center',
        borderRadius: 25,
        width: 100,
        alignSelf: 'center',
    },
    formContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    formTitle: {
        padding: 20,
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default styles;
