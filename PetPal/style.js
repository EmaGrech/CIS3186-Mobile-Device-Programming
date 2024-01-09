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
    formInput: {
        borderColor: 'gray',
        borderWidth: 1,
        padding: 5,
        height: 40,
        marginBottom: 5,
        borderRadius: 10,
    },
    formButton: {
        backgroundColor: '#70afe6',
        padding: 10,
        alignItems: 'center',
        borderRadius: 25,
    },
    infoContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
    },
    infoImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
    },
    infoProductName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    },
    infoDescription: {
    marginBottom: 10,
    },
    infoPrice: {
    marginBottom: 10,
    },
    infoStock: {
    marginBottom: 20,
    },
});

export default styles;
