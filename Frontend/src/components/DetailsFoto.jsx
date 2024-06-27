import { useSelector } from "react-redux";
import ImageGallery from "react-image-gallery";
import 'react-image-gallery/styles/css/image-gallery.css';
const DetailsFoto = () => {
  const { singleAd } = useSelector((state) => state.ad);
 console.log(singleAd, "SINGLEAD");

 const denem = singleAd?.images?.map((item) => ({
  original: `https://kellerstore.onrender.com/images/${item}`,
  thumbnail: `https://kellerstore.onrender.com/images/${item}`, // Eğer küçük resimler farklıysa,
})) || [];
//console.log(denem)


  // const images = [
  //   {
  //     original: `https://kellerstore.onrender.com/images/${singleAd?.images}`,
  //     thumbnail: "https://picsum.photos/id/1018/250/150/",
  //     sizes:15,
  //     description: "15",

  //   },
  //   {
  //     original: "https://picsum.photos/id/1015/1000/600/",
  //     thumbnail: "https://picsum.photos/id/1015/250/150/",
  //   },
  //   {
  //     original: "https://picsum.photos/id/1019/1000/600/",
  //     thumbnail: "https://picsum.photos/id/1019/250/150/",
  //   },
  //   {
  //     original: "https://picsum.photos/id/1019/1000/600/",
  //     thumbnail: "https://picsum.photos/id/1019/250/150/",
  //   },
  //   {
  //     original: "https://picsum.photos/id/1019/1000/600/",
  //     thumbnail: "https://picsum.photos/id/1019/250/150/",
  //   },
  // ];



  return (
    <div>

<ImageGallery items={denem}   showNav={false}   showPlayButton={false}/>
      {/* <div className="flex justify-center ">
        <img
          src={`https://kellerstore.onrender.com/images/${singleAd?.images}`}
          width={600}
          alt="img"
          className="ms-1 mt-5 rounded-lg"
        />
      </div>
      <div className="flex justify-between mx-2">
        <img
          src="https://images.unsplash.com/photo-1556155092-490a1ba16284?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
          width={175}
          alt="img"
          className="ms-1 mt-5 rounded-lg"
        />
        <img
          src="https://images.unsplash.com/photo-1556155092-490a1ba16284?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
          width={175}
          alt="img"
          className="ms-1 mt-5 rounded-lg"
        />
        <img
          src="https://images.unsplash.com/photo-1556155092-490a1ba16284?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
          width={175}
          alt="img"
          className="ms-1 mt-5 rounded-lg"
        />
        <img
          src="https://images.unsplash.com/photo-1556155092-490a1ba16284?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
          width={175}
          alt="img"
          className="ms-1 mt-5 rounded-lg"
        />
      </div> */}
    </div>
  );
};

export default DetailsFoto;
