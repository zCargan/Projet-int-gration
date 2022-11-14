import { notXSSInjection } from '../components/Inscription.js'
import { notToLongString } from '../components/Inscription.js'
import { checkEmail } from '../components/Inscription.js'
import { allComplete } from '../components/Inscription.js'
import { allNotToLong } from '../components/Inscription.js'
import { allNotXSSInjection } from '../components/Inscription.js'
import { HasValidLength } from '../components/Inscription.js'
import { HasLowerCaseLetter } from '../components/Inscription.js'
import { HasUpperCaseLetter } from '../components/Inscription.js'
import { HasSpecialCharacter } from '../components/Inscription.js'
import { HasNumber } from '../components/Inscription.js'
import { HasAll } from '../components/Inscription.js'
import { sameString } from '../components/Inscription.js'





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


test('Tester si tous les champs sont complétés', () => {
    const test = allComplete("Logan", "", "LoganEncore", "LoganEtToujours");
    expect(test).toBe(false)
})


test('Tester si tous les champs sont complétés', () => {
    const test = allComplete("Logan", "LoganPourLaDeuxiemeFois", "LoganEncore", "LoganEtToujours");
    expect(test).toBe(true)
})


test('Tester si tous les champs sont complétés', () => {
    const test = allComplete("", "", "", "");
    expect(test).toBe(false)
})


test('Tester si tous les champs sont plus courts que 30', () => {
    const test = allNotToLong("CeciEstUneChaineDeCaractèresVraimentMaisAlorsLaVraimentTropLongDAuMoins30Caractères", "CeciEstUneChaineDeCaractèresVraimentMaisAlorsLaVraimentTropLongDAuMoins30Caractèresx2", "CeciEstUneChaineDeCaractèresVraimentMaisAlorsLaVraimentTropLongDAuMoins30Caractèresx3", "CeciEstUneChaineDeCaractèresVraimentMaisAlorsLaVraimentTropLongDAuMoins30Caractèresx4");
    expect(test).toBe(false)
})


test('Tester si tous les champs sont plus courts que 30', () => {
    const test = allNotToLong("Logan", "Logan1", "Logan2", "Logan3");
    expect(test).toBe(true)
})


test('Tester si tous les champs sont plus courts que 30', () => {
    const test = allNotToLong("CeciEstUneChaineDeCaractèresVraimentMaisAlorsLaVraimentTropLongDAuMoins30Caractères", "Logan1", "Logan2", "Logan3");
    expect(test).toBe(false)
})


test('Tester si l utilsateur n entre pas dans les champs input le caractère < afin de se protéger des injections XSS', () => {
    const test = allNotXSSInjection("Logan", "Logan1", "Logan2", "Logan3")
    expect(test).toBe(true)
})


test('Tester si l utilsateur n entre pas dans les champs input le caractère < afin de se protéger des injections XSS', () => {
    const test = allNotXSSInjection("Logan<", "Logan1", "Logan2", "Logan3")
    expect(test).toBe(false)
})


test('Tester si l utilsateur n entre pas dans les champs input le caractère < afin de se protéger des injections XSS', () => {
    const test = allNotXSSInjection("Logan<", "Logan1<", "Logan2<", "Logan3<")
    expect(test).toBe(false)
})


test('Tester si l utilsateur n entre pas dans les champs input le caractère < afin de se protéger des injections XSS', () => {
    const test = allNotXSSInjection("Logan>", "Logan1", "Logan2", "Logan3")
    expect(test).toBe(true)
})


test("Tester si l'utilsateur rentre un mot de passe assez long", () => {
    const test = HasValidLength('Password12Caractères')
    expect(test).toBe(true)
})


test("Tester si l'utilsateur rentre un mot de passe assez long", () => {
    const test = HasValidLength('PswCourt')
    expect(test).toBe(false)
})


test("Tester si l'utilsateur rentre un mot de passe assez long", () => {
    const test = HasValidLength('')
    expect(test).toBe(false)
})


test("Tester si la string placer en paramètres possède bien une lettre minuscule", () => {
    const test = HasLowerCaseLetter('Logan')
    expect(test).toBe(true)
})


test("Tester si la string placer en paramètres possède bien une lettre minuscule", () => {
    const test = HasLowerCaseLetter('LOGAN')
    expect(test).toBe(false)
})


test("Tester si la string placer en paramètres possède bien une lettre minuscule", () => {
    const test = HasLowerCaseLetter('')
    expect(test).toBe(false)
})


test("Tester si la string placer en paramètres possède bien une lettre majuscule", () => {
    const test = HasUpperCaseLetter('logan')
    expect(test).toBe(false)
})


test("Tester si la string placer en paramètres possède bien une lettre majuscule", () => {
    const test = HasUpperCaseLetter('LOGAN')
    expect(test).toBe(true)
})


test("Tester si la string placer en paramètres possède bien une lettre majuscule", () => {
    const test = HasUpperCaseLetter('')
    expect(test).toBe(false)
})


test("Tester si la string possède bien un caractère spécial", () => {
    const test = HasSpecialCharacter("Log@n")
    expect(test).toBe(true)
})


test("Tester si la string possède bien un caractère spécial", () => {
    const test = HasSpecialCharacter("Logan")
    expect(test).toBe(false)
})


test("Tester si la string possède bien un caractère spécial", () => {
    const test = HasSpecialCharacter("Logan$")
    expect(test).toBe(true)
})


test("Tester si la string possède bien un caractère spécial", () => {
    const test = HasSpecialCharacter("Logan!")
    expect(test).toBe(true)
})


test("Tester si la string possède bien un caractère spécial", () => {
    const test = HasSpecialCharacter("")
    expect(test).toBe(false)
})


test("Tester si la string possèd bien un nombre", () => {
    const test = HasNumber("L0gan")
    expect(test).toBe(true)
})


test("Tester si la string possèd bien un nombre", () => {
    const test = HasNumber("Logan")
    expect(test).toBe(false)
})


test("Tester si la string possèd bien un nombre", () => {
    const test = HasNumber("")
    expect(test).toBe(false)
})


test("Tester si la string possède bien une lettre minuscule, une lettre majuscule, un nombre, un caractère spécial et fait plus de 12 caractères", () => {
    const test = HasAll("LoganLogan12@")
    expect(test).toBe(true)
})


test("Tester si la string possède bien une lettre minuscule, une lettre majuscule, un nombre, un caractère spécial et fait plus de 12 caractères", () => {
    const test = HasAll("LoganLogan")
    expect(test).toBe(false)
})


test("Tester si la string possède bien une lettre minuscule, une lettre majuscule, un nombre, un caractère spécial et fait plus de 12 caractères", () => {
    const test = HasAll("LoganLogan12")
    expect(test).toBe(false)
})


test("Tester si la string possède bien une lettre minuscule, une lettre majuscule, un nombre, un caractère spécial et fait plus de 12 caractères", () => {
    const test = HasAll("")
    expect(test).toBe(false)
})


test("Tester si la string possède bien une lettre minuscule, une lettre majuscule, un nombre, un caractère spécial et fait plus de 12 caractères", () => {
    const test = HasAll("Logan")
    expect(test).toBe(false)
})


test("Tester si deux string sont les même", () => {
    const test = sameString("Password", "Password")
    expect(test).toBe(true)
})


test("Tester si deux string sont les même", () => {
    const test = sameString("Password", "password")
    expect(test).toBe(false)
})


test("Tester si deux string sont les même", () => {
    const test = sameString("Password", "Logan")
    expect(test).toBe(false)
})


test("Tester si deux string sont les même", () => {
    const test = sameString("password", "password")
    expect(test).toBe(true)
})