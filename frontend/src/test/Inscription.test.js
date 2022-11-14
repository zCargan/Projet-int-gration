import { notXSSInjection } from '../components/Inscription.js'
import { notToLongString } from '../components/Inscription.js'
import { checkEmail } from '../components/Inscription.js'


test('Tester la non injection XSS', () => {
    const test = notXSSInjection('<Logan');
    expect(test).toBe(false);
});

test('Tester la non injection XSS', () => {
    const test = notXSSInjection('Logan');
    expect(test).toBe(true);
});

test('Tester la longueur d une chaine de caractère', () => {
    const string = 'CeciEstUneChaineDeCaractèresVraimentMaisAlorsLaVraimentTropLongDAuMoins30Caractères';
    const test = notToLongString(string);
    expect(test).toBe(false);
});


test('Tester la longueur d une chaine de caractère', () => {
    const string = 'PasUneChaineDe30Caractères';
    const test = notToLongString(string);
    expect(test).toBe(true);
});

test('Tester si l adresse email est valide ou pas', () => {
    const email = 'lgc.carlier@gmail.com';
    const test = checkEmail(email);
    expect(test).toBe(true)
})

test('Tester si l adresse email est valide ou pas', () => {
    const email = 'lgc.carliergmail.com';
    const test = checkEmail(email);
    expect(test).toBe(false)
})