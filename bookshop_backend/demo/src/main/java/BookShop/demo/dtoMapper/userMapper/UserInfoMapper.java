package BookShop.demo.dtoMapper.userMapper;

import BookShop.demo.dto.UserInfoDTO;
import BookShop.demo.model.Role;
import BookShop.demo.model.User;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface UserInfoMapper {

    @Mapping(target = "roles", source = "roles", qualifiedByName = "mapRolesToNames")
    UserInfoDTO toDTO(User user);

    @InheritInverseConfiguration
    @Mapping(target = "roles", source = "roles", qualifiedByName = "mapNamesToRoles")
    User toEntity(UserInfoDTO userDTO);

    @Named("mapRolesToNames")
    default List<String> mapRolesToNames(List<Role> roles) {
        if (roles == null) {
            return new ArrayList<>();
        }
        return roles.stream()
                .map(Role::getRolename)
                .collect(Collectors.toList());
    }

    @Named("mapNamesToRoles")
    default List<Role> mapNamesToRoles(List<String> roleNames) {
        if (roleNames == null) {
            return new ArrayList<>();
        }
        return roleNames.stream()
                .map(name -> {
                    Role role = new Role();
                    role.setRoleName(name);
                    return role;
                })
                .collect(Collectors.toList());
    }

}


