import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    listItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    image: {
        width: 100,
        height: 100,
        marginRight: 10,
    },
    textContainer: {
        flex: 1,
    },
    productName: {
        fontSize: 16,
        marginBottom: 5,
    },
    price: {
        marginTop: 5,
        fontWeight: 'bold',
    },
    input: {
        borderColor: 'gray',
        borderWidth: 1,
        padding: 5,
        height: 40,
        marginBottom: 5,
        borderRadius: 10,
    },
    button: {
        backgroundColor: '#70afe6',
        padding: 10,
        alignItems: 'center',
        borderRadius: 25,
    },
});

export default styles;
