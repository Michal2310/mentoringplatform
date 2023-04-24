import { Country, Languages, Skill, useAccountUpdate } from "../../hooks/useAccoutUpdate";
import ChangeInfoForm from "../../components/ChangeInfoForm/ChangeInfoForm";
import DropdownMenu from "../../components/DropdownMenu/DropdownMenu";
import ChangePassword from "../../components/ChangePassword/ChangePassword";

const UpdateUserInfo = () => {
  const {
    checkedSkills,
    setCheckedSkills,
    setCheckedLanguages,
    checkedCountry,
    setCheckedCountry,
    checkedLanguages,
    skills,
    country,
    languages,
    onSubmit,
    isUpdating,
  } = useAccountUpdate();

  return (
    <>
      <ChangeInfoForm
        onSubmit={onSubmit}
        isUpdating={isUpdating}
        header="Change your account information"
      >
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
      <ChangePassword />
    </>
  );
};

export default UpdateUserInfo;
