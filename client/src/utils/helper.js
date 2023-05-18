import {
  // Auth0Contract,
  ComposableContract,
  MedicalDataNFTContract,
} from "./contracts";
export const filterListOfNFTs = (_collections, _categorys) => {
  const nfts = [];
  Object.entries(_collections).filter(([patient, collections]) => {
    const userCollection = [];
    const userData = [];
    Object.entries(collections).filter(([collection, data]) => {
      userCollection.push(collection);
      userData.push(...data);
      return;
    });

    if (_categorys.length > 0) {
      const allItemsPresent = _categorys.every((item) =>
        userCollection.includes(item)
      );
      if (allItemsPresent) {
        nfts.push(...userData);
      }
    } else {
      nfts.push(...userData);
    }
    return;
  });
  return nfts;
};
export const extractNfts = (_collections) => {
  const nfts = [];
  Object.entries(_collections).filter(([patient, collections]) => {
    Object.entries(collections).filter(([collection, data]) =>
      nfts.push(...data)
    );
    return;
  });
  return nfts;
};

export const getCollections = async () => {
  try {
    const response = await ComposableContract.methods.getComposition().call();
    return parseCollection(response);
  } catch (error) {
    console.log(error);
  }
};

export const categorizeNfts = (_nfts) => {
  const patientNFTs = {};
  _nfts.forEach((nft) => {
    const patientAddress = nft.owner;
    const nftCategory = nft.name;
    if (!patientNFTs[patientAddress]) {
      patientNFTs[patientAddress] = {};
    }
    if (!patientNFTs[patientAddress][nftCategory]) {
      patientNFTs[patientAddress][nftCategory] = [];
    }
    patientNFTs[patientAddress][nftCategory].push(nft);
  });
  return patientNFTs;
};
export const getNfts = async (_ids) => {
  const result = [];
  try {
    await MedicalDataNFTContract.methods
      .getNFTs(_ids)
      .call()
      .then((nfts) => nfts.forEach((nft) => result.push(parseNft(nft))));
  } catch (error) {
    console.log(error);
  }
  console.log(result);
};
export function parseAdmin(response) {
  return {
    wallet: response.wallet,
    role: response.name,
    email: response.email,
    password: response.password,
  };
}
export function parseLaboratory(response) {
  return {
    id: response.id,
    name: response.name,
    email: response.email,
    password: response.password,
    wallet: response.wallet,
    role: response.role,
    license: response.license,
    discription: response.discription,
  };
}
export function parsePatient(patient) {
  return {
    id: patient.id,
    nom: patient.nom,
    prenom: patient.prenom,
    email: patient.email,
    password: patient.password,
    wallet: patient.wallet,
    role: patient.role,
    birthday: patient.birthday,
    sexe: patient.sexe,
  };
}
export function parseUser(user) {
  return {
    wallet: user.wallet,
    requests: user.requests,
    nfts: user.nfts,
    collections: user.collections,
    enable: user.enable,
  };
}
export function parseRequests(requests) {
  const result = [];
  requests.forEach((request) => {
    result.push({
      collections: request.collection,
      id: request.id,
      ids: [...request.ids],
      data: request.date,
      period: request.period,
      price: request.price,
      buyer: request.buyer,
      seller: request.seller,
      isSeenBySeller: request.isSeenBySeller,
      isAcceptedBySeller: request.isAcceptedBySeller,
      isSeenByBuyer: request.isSeenByBuyer,
      isPayedByBuyer: request.isPayedByBuyer,
    });
  });
  return result;
}
export function parseNft(nft) {
  return {
    id: nft.id,
    name: nft.name,
    owner: nft.owner,
    date: nft.date,
    price: nft.price,
    data: nft.data,
    birthday: nft.birthday,
    sexe: nft.sexe,
  };
}
export function parseNFTS(nfts) {
  const result = [];
  nfts.forEach((nft) => {
    result.push({
      id: nft.id,
      name: nft.name,
      owner: nft.owner,
      date: nft.date,
      price: nft.price,
      data: nft.data,
      birthday: nft.birthday,
      sexe: nft.sexe,
    });
  });
  return result;
}

export function parseCollection(collections) {
  const result = [];
  collections.forEach((collection) => {
    result.push({
      owner: collection.owner,
      buyer: collection.buyer,
      date: collection.date,
      deleted: collection.deleted,
      price: collection.price,
      nfts: [...collection.nfts],
    });
  });
  return;
}
