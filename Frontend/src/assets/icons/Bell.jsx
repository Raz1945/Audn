import { ButtonHam } from '@/components/ui/Buttons/ButtonHam/ButtonHam';
import { smIcons } from "@/assets/icons";

export const Bell = () => {
  return (
    <>
      <ButtonHam
        options={[
          {
            label: (
              <>
                <img src={smIcons.paper_plane} alt="notificación" style={{ width: 16, height: 16, marginRight: 8 }} />
                Bienvenido a Audn!
              </>
            ),
            onClick: () => console.log("Bienvenido a Audn!")
          },
          {
            label: (
              <>
                <img src={smIcons.paper_plane} alt="notificación" style={{ width: 16, height: 16, marginRight: 8 }} />
                Crea tu Playlist Cupido Musical
              </>
            ),
            onClick: () => console.log("Crea tu Playlist Cupido Musical")
          },
        ]}
        icon={smIcons.bell.activeTrue}
      />
    </>
  )
}
