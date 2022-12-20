import React from 'react';
import "../styles/about_us.css"

const about_us = () => {
    return (
        <div>
            <div className='div_globale'>
                <div>
                    <h2>
                        Qui sommes-nous?
                    </h2>
                    <p>
                        Nous sommes des étudiants de l'EPHEC Louvain la Neuve réalisant un projet dans le cadre du cours d'intégration des technologies de bac 3.
                    </p>
                    <br>
                    </br>
                </div>
                <div>
                    <h2>
                        Qu'avons-nous fait?
                    </h2>
                    <p>
                        Nous avons réalisé NewMe qui est une application visant à motiver ses utilisateurs à prendre de nouvelles initiatives.
                        <br></br>
                        En effet, grâce à notre application, les utilisateurs pourront utiliser notre site comme moyen de se fixer de nouveaux objectifs, qu'ils soient quotidiens, hebdomadaires,..
                    </p>

                    <p>
                        Grâce à son système de followers, vous pourrez suivre les bonnes habitudes prises par les personnes que vous suivez pour, pourquoi pas, vous en inspirer.
                    </p>
                </div>
                <div>
                    <h2>
                        Pourquoi NewMe?
                    </h2>
                    <br></br>
                    <div>
                        <p> Nous voulions une application communautaire afin de fournir une aide dans cette société en détresse. Nous connaissons tous des personnes ayant peu d'estime pour eux par exemple.
                        </p>
                        <br></br>
                        <p> Grâce à NewMe, ces derniers pourront reprendre confiance en eux et se dépasser en réalisant chaque jour leurs nouveaux objectifs</p>
                    </div>
                </div>
                <div className='div4'>
                    <h2>
                        N'y a t'il que NewMe?
                    </h2>
                    <br></br>
                    <p>
                        Nous avons en complément de NewMe développé une montre connectée visant à informer son utilisateur sur son état de santé.
                    </p>
                    <br>
                    </br>
                    <p>
                        L'utilisateur pourra donc obtenir des informations sur son nombre de battements cardiaques, le nombre de pas effectué, sa vitesse moyenne, sa vitesse maximale de la journée, ... Le tout visant l'utilisateur à se bouger et à réaliser ses objectifs aussi bien intellectuels que physique.
                    </p>
                    <br>
                    </br>
                    <p>
                        <p>
                            Cette dernière est un raspberry PI sur lequel nous avons ajouté des capteurs.
                            Les données de ces derniers sont enregistré sur une clé USB devant être branchées à un ordinateur afin d'avoir accès aux données de cette dernière.
                        </p>
                        <br></br>
                        <p>Elles sont interprétables sur le site NewMe dans le page "Données" une fois l'utilisateur connecté</p>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default about_us;