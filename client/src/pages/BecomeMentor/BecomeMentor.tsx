import { useMutation } from "react-query";
import { Country, FormData, Languages, Skill, useAccountUpdate } from "../../hooks/useAccoutUpdate";
import ChangeInfoForm from "../../components/ChangeInfoForm/ChangeInfoForm";
import DropdownMenu from "../../components/DropdownMenu/DropdownMenu";
import useApi from "../../hooks/useApi";

const BecomeMentor = () => {
  const fetchData = useApi();
  const {
    checkedSkills,
    checkedCountry,
    checkedLanguages,
    country,
    skills,
    languages,
    onSubmit,
    setCheckedCountry,
    setCheckedLanguages,
    setCheckedSkills,
  } = useAccountUpdate();

  const { mutateAsync: becomeMentorAsync } = useMutation({
    mutationKey: ["createMentor"],
    mutationFn: async ({ firstname, lastname, about, title }: FormData) =>
      await fetchData("/api/mentor", "post", true, {
        data: {
          firstname,
          lastname,
          about,
          title,
          country: checkedCountry,
          skills: Object.keys(checkedSkills),
          languages: Object.keys(checkedLanguages),
        },
      }),
  });

  const onBecomeMentor = async (FormData: FormData) => {
    await becomeMentorAsync(FormData);
    await onSubmit(FormData);
  };

  return (
    <>
      <ChangeInfoForm onSubmit={onBecomeMentor} header="Become mentor">
        <DropdownMenu<Skill, Record<string, boolean>>
          itemKey={"skill"}
          dataArray={skills}
          state={checkedSkills}
          setState={setCheckedSkills}
        />
        <DropdownMenu<Languages, Record<string, boolean>>
          itemKey={"language"}
          dataArray={languages}
          state={checkedLanguages}
          setState={setCheckedLanguages}
        />
        <DropdownMenu<Country, Record<string, boolean>>
          itemKey={"country"}
          dataArray={country}
          state={checkedCountry}
          setState={setCheckedCountry}
          isRadioButton={true}
        />
      </ChangeInfoForm>
    </>
  );
};

export default BecomeMentor;
