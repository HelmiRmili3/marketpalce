import Category from "../Category/category";
import "./categorys.css";
const Categorys = ({ nftCategories }) => {
  return (
    <>
      <div className="categorys" >
        {Object.entries(nftCategories).map(([category, nftList]) => (
          <Category key={category} category={category} nftList={nftList} />
        ))}
      </div>
    </>
  );
};
export default Categorys;
