"use client";

import { useEffect, useState } from "react";
import styles from "@/styles/page.module.css";
import BlurText from "@/components/BlurText";
import RegisterModal from "@/components/RegisterModal";
import { supabase } from "@/utils/supabaseClient";
import SearchBar from "@/components/SearchBar";
import { FaMapMarkerAlt, FaUserCircle } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import profiles from "@/data/proofProfiles";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import CircularText from "@/components/CircularText";

export default function Home() {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [totalProfiles, setTotalProfiles] = useState(0);

  useEffect(() => {
    const fetchProfiles = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("id", { count: "exact" });

      if (error) {
        console.error("Error al obtener perfiles:", error);
      } else {
        setTotalProfiles(data.length);
      }
    };

    fetchProfiles();
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <>
      <div className={styles.page}>
        <div className={styles.container}>
          <header className={styles.header}>
            <BlurText
              text="Talent Bridge DB"
              delay={150}
              animateBy="words"
              direction="top"
            />
            <h2 className={styles.welcomeMessage}>
              Base de talentos, donde empresas y candidatos pueden explorar y
              conectarse de manera rápida y efectiva.
            </h2>
            <p className={styles.searchingJob}>
              ¿Estás buscando trabajo?{" "}
              <button
                onClick={() => setShowRegisterModal(true)}
                className={styles.createProfile}
              >
                Crear perfil
              </button>
            </p>
            {showRegisterModal && (
              <RegisterModal onClose={() => setShowRegisterModal(false)} />
            )}
          </header>

          <SearchBar />
        </div>

        <div className={styles.textGraphic}>
          <h3>
            ¿Sos reclutador, dueño de una empresa o estás buscando talento para
            tu equipo?
          </h3>
          <p style={{ textAlign: "center" }}>
            Encontrá al <b>candidato ideal</b> y hacé crecer tu{" "}
            <b>negocio, empresa o emprendimiento</b> con los mejores empleados.
          </p>
        </div>

        <div className={styles.graphicContainer}>
          <div className={styles.graphic}>
            <img
              src="/connectingTalent.jpg"
              alt="Graphic."
              data-aos="zoom-in"
              data-aos-duration="800"
              data-aos-once="true"
            />
          </div>
          <div className={styles.textGraphic}>
            <div className={styles.modernList}>
              <div className={styles.item}>
                <div className={styles.circle}>1</div>
                <div className={styles.content}>
                  <strong>Plataformas:</strong> Conectamos talento y empresas a
                  través de una plataforma innovadora que simplifica la búsqueda
                  y el reclutamiento.
                </div>
              </div>
              <div className={styles.item}>
                <div className={styles.circle}>2</div>
                <div className={styles.content}>
                  <strong>Identificación:</strong> Facilitamos la identificación
                  del candidato ideal mediante un sistema eficiente que resalta
                  habilidades y experiencia.
                </div>
              </div>
              <div className={styles.item}>
                <div className={styles.circle}>3</div>
                <div className={styles.content}>
                  <strong>Estrategia:</strong> Optimizamos el proceso de
                  contratación con una estrategia ágil y efectiva, adaptada a
                  las necesidades del mercado.
                </div>
              </div>
              <div className={styles.item}>
                <div className={styles.circle}>4</div>
                <div className={styles.content}>
                  <strong>Oportunidades:</strong> Abrimos las puertas a nuevas
                  oportunidades, permitiendo que empresas y profesionales
                  encuentren su mejor camino al éxito.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.carouselWrapper}>
          <Swiper
            spaceBetween={30}
            slidesPerView={1}
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              1024: {
                slidesPerView: 2,
              },
            }}
          >
            {profiles.map((profile) => (
              <SwiperSlide key={profile.id}>
                <div className={styles.prueba}>
                  <div
                    className={styles.profileCard}
                    data-aos="fade-up"
                    data-aos-delay="100"
                    data-aos-duration="800"
                  >
                    <div className={styles.fotoContainer}>
                      <FaUserCircle className={styles.defaultProfileIcon} />
                      <h3>{profile.name}</h3>
                      <h4>{profile.title}</h4>
                      <h5>
                        <FaMapMarkerAlt className={styles.locationIcon} />
                        {profile.location}
                      </h5>
                    </div>
                    <div className={styles.descritionContainer}>
                      <h6>{profile.description}</h6>
                      <p>
                        <strong>Habilidades:</strong> {profile.skills}
                      </p>
                      <p>
                        <strong>Años de experiencia:</strong>{" "}
                        {profile.experience}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
}

/*         {totalProfiles > 0 && (
          <div className={styles.totalProfiles}>
            <p>
              🎉 +{totalProfiles} perfiles ya forman parte de nuestra red de
              talentos
            </p>
          </div>
        )} */

/* 

                      <CircularText
              text="CONEXIÓN*OPORTUNIDAD*TALENTO*"
              onHover="speedUp"
              spinDuration={20}
            />*/
